<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use App\Models\Sales_product_model;
use App\Models\Stock;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesController extends Controller
{
    /* ===================== STORE SALES (MULTI ROW) ===================== */
    public function Store_sales(Request $request)
    {
        $request->validate([
            'customer_name'               => 'required|string|max:255',
            'items'                       => 'required|array|min:1',
            'items.*.product_name'        => 'required|string|max:255',
            'items.*.product_code'        => 'required|string|max:100',
            'items.*.product_qty'         => 'required|integer|min:1',
            'items.*.price'               => 'required|numeric|min:0'
        ]);

        DB::beginTransaction();

        try {

            // ✅ 1. Create MAIN SALE (only once)
            $sale = Sales::create([
                'customer_name' => $request->customer_name,
                'price' => 0 // will update later
            ]);

            $grandTotal = 0;

            // ✅ 2. Insert MULTIPLE ITEMS
            foreach ($request->items as $item) {

                $stock = Stock::where('product_name', $item['product_name'])
                    ->lockForUpdate()
                    ->first();

                if (!$stock) {
                    throw new \Exception("Stock not found for {$item['product_name']}");
                }

                if ($stock->stock_qty < $item['product_qty']) {
                    throw new \Exception("Insufficient stock for {$item['product_name']}");
                }

                // reduce stock
                $stock->decrement('stock_qty', $item['product_qty']);

                $itemTotal = $item['product_qty'] * $item['price'];
                $grandTotal += $itemTotal;

                Sales_product_model::create([
                    'sale_id'      => $sale->id,
                    'item_name'    => $item['product_name'],
                    'item_code'    => $item['product_code'],
                    'qty'          => $item['product_qty'],
                    'price'        => $item['price'],
                    'total'        => $itemTotal
                ]);
            }

            // ✅ 3. Update grand total
            $sale->update(['price' => $grandTotal]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'sale_id' => $sale->id
            ]);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => 'error,',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /* ===================== GET ALL SALES ===================== */
    public function Sales_my()
    {
        return response()->json([
            'status' => 'ok',
            'data' => Sales::latest()->get()
        ]);
    }

    /* ===================== GET SINGLE ===================== */
    public function Sales_get_value_in_db($id)
    {
        $sale = Sales::find($id);
        $sale_items = DB::select("SELECT * FROM sales_items where sale_id='$id'");
        return response()->json([
            'status' => 'ok',
            'data' => $sale,
            'product_data' => $sale_items
        ]);
    }

    /* ===================== UPDATE SINGLE ROW ===================== */
    public function Sales_update(Request $request, $id)
{
    $request->validate([
        'customer_name'           => 'required|string',
        'items'                   => 'required|array',
        'items.*.id'              => 'required|integer',
        'items.*.product_name'    => 'required|string',
        'items.*.product_code'    => 'required|string',
        'items.*.product_qty'     => 'required|integer',
        'items.*.price'           => 'required|numeric',
    ]);

    DB::beginTransaction();

    try {

        // 1️⃣ Update main sale
        $sale = Sales::findOrFail($id);
        $sale->update([
            'customer_name' => $request->customer_name,
        ]);

        // 2️⃣ Update each item + adjust stock
        foreach ($request->items as $item) {

            // get old item row
            $oldItem = Sales_product_model::where('id', $item['id'])
                ->where('sale_id', $id)
                ->firstOrFail();

            $oldQty = $oldItem->qty;
            $newQty = $item['product_qty'];

            // get stock
            $stock = Stock::where('product_name', $oldItem->item_name)
                ->lockForUpdate()
                ->firstOrFail();

            // adjust stock (increase / decrease)
            $stock->stock_qty = $stock->stock_qty + $oldQty - $newQty;

            if ($stock->stock_qty < 0) {
                throw new \Exception('Insufficient stock for ' . $oldItem->item_name);
            }

            $stock->save();

            // update item
            $oldItem->update([
                'item_name' => $item['product_name'],
                'item_code' => $item['product_code'],
                'qty'       => $newQty,
                'price'     => $item['price'],
            ]);
        }

        DB::commit();
        return response()->json(['status' => 'success']);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 400);
    }
}


    /* ===================== DELETE ===================== */
    public function Sales_delete($id)
    {
        $sale = Sales::find($id);

        if ($sale) {
            $stock = Stock::where('product_name', $sale->product_name)->first();

            if ($stock) {
                $stock->increment('stock_qty', $sale->product_qty);
            }

            $sale->delete();
        }

        return response()->json(['status' => 'success']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Sales;
use App\Models\Stock;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function Store_sales(Request $request)
    {
        $request->validate([
            'product_name'    => 'required|string|max:255',
            'product_code'    => 'required|string|max:100',
            'customer_name'   => 'required|string|max:255',
            'product_qty'     => 'required|integer|min:1',
            'price'           => 'required|numeric|min:0'
        ]);



        $get_product_qty =   Stock::where('product_name', $request->product_name)->first();


        if ($get_product_qty->stock_qty < $request->product_qty) {
            return response()->json([
                'status' => 'error',
                'message' => 'Requested quantity exceeds available stock'
            ], 400);
        }

        $get_product_qty->update([
            'stock_qty' => ($get_product_qty->stock_qty - $request->product_qty),
        ]);

        Sales::create([
            'product_name' => $request->product_name,
            'product_code' => $request->product_code,
            'customer_name' => $request->customer_name,
            'product_qty' => $request->product_qty,
            'price' => $request->price
        ]);
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function Sales_my()
    {
        $sales_values =  Sales::all();
        return response()->json([
            'status' => 'ok',
            'data' => $sales_values
        ]);
    }

    public function Sales_get_value_in_db($id)
    {
        $value =  Sales::find($id);

        return response()->json([
            'status' => 'ok',
            'data' => $value
        ]);
    }

    public function Sales_update(Request $request, $id)
    {
        $sale = Sales::find($id);

        if ($sale) {
            $request->validate([
                'product_name'    => 'required|string|max:255',
                'product_code'    => 'required|string|max:100',
                'customer_name'   => 'required|string|max:255',
                'product_qty'     => 'required|integer|min:1',
                'price'           => 'required|numeric|min:0'
            ]);

            $stock = Stock::where('product_name', $sale->product_name)->first();
            $total_stock = $sale->product_qty + $stock->stock;

            if ($stock) {
                // Return the old sale quantity to stock
                $stock->stock_qty += $sale->product_qty;

                // Subtract the new sale quantity
                $stock->stock_qty -= $request->product_qty;

                // Update stock
                $stock->save();

                if ($stock->stock_qty < $request->product_qty) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Requested quantity exceeds available stock'
                    ], 400);
                }

                $sale->update([
                    'product_name' => $request->product_name,
                    'product_code' => $request->product_code,
                    'customer_name' => $request->customer_name,
                    'product_qty' => $request->product_qty,
                    'price' => $request->price

                ]);

                return response()->json([
                    'status' => 'success'
                ]);
            }
        } else {
            return response()->json([
                'status' => 'failed'
            ]);
        }
    }

    public function Sales_delete($id)
    {
        $sale = Sales::find($id);

        if ($sale) {
            $stock = Stock::where('product_name', $sale->product_name)->first();

            if ($stock) {
                $stock->update([
                    'stock_qty' => $stock->stock_qty + $sale->product_qty,
                ]);
            }
            $sale->delete();
        }
    }
}

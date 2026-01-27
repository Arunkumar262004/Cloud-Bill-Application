<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class Stock_controller extends Controller
{
    public function Store_Stock(Request $request)
    {

        $request->validate([
            "product_name" => "string|unique:stock_table",
            "product_code" => "integer|unique:stock_table",
            "stock_qty" => "required|integer",
            "price" => "required|integer"
        ]);
        Stock::create([
            'product_name' => $request->product_name,
            'product_code' => $request->product_code,
            'stock_qty' => $request->stock_qty,
            'price' => $request->price

        ]);
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function Stock_my()
    {
        $Stock_values =  Stock::all();
        return response()->json([
            'status' => 'ok',
            'data' => $Stock_values
        ]);
    }

    public function Stock_get_value_in_db($id)
    {
        $value =  Stock::find($id);

        return response()->json([
            'status' => 'ok',
            'data' => $value
        ]);
    }

    public function Stock_update(Request $request, $id)
    {
        $id = Stock::find($id);

        if ($id) {
            $request->validate([
                "product_name" => "string|unique:stock_table,product_code".$id,
                "product_code" => "integer|unique:stock_table,product_code".$id,
                "stock_qty" => "required|integer",
                "price" => "required|integer"
            ]);
            $id->update([
                'product_name' => $request->product_name,
                'product_code' => $request->product_code,
                'stock_qty' => $request->stock_qty,
                'price' => $request->price

            ]);
            return response()->json([
                'status' => 'success'
            ]);
        }
    }

    public function Stock_delete($id)
    {
        $id = Stock::find($id);
        $id->delete();
    }
}

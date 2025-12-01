<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class Stock_controller extends Controller
{
    public function Store_Stock(Request $request)
    {
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

    public function Stock_delete($id)
    {
        $id = Stock::find($id);
        $id->delete();
    }
}

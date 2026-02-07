<?php

namespace App\Http\Controllers;
use App\Models\Sales_product_model;

use App\Models\Sales;
use App\Models\Stock;
use Illuminate\Http\Request;

class dashboardcontroller extends Controller
{
    public function get_total_sales(){
        $totalSales = Sales_product_model::sum('qty');
        $totalStock = Stock::sum('stock_qty');


        return response()->json([
            'total_sales' => $totalSales,
            'totalStock' => $totalStock

        ]);
    }
}

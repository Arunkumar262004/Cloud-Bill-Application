<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stock_table';
    protected $fillable = ['product_name', 'product_code', 'stock_qty', 'price'];
}

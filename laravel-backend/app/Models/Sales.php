<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    protected $table = 'Sales_table';
    protected $fillable = ['product_name','product_code','product_qty','customer_name','price'];
}

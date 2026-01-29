<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sales_product_model extends Model
{
    protected $table = 'sales_items';

    protected $fillable = [
        'item_name',
        'item_code',
        'qty',
        'sale_id',
        'price',
        'total'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    protected $table = 'sales_table';
    protected $fillable = ['customer_name','price'];
}

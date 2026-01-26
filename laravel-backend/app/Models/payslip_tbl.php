<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class payslip_tbl extends Model
{
      protected $table = 'pay_slip_data_table';
    protected $fillable = ['emp_name','emp_code','salary'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact_model extends Model
{
    protected $table = 'contact_table';
    protected $fillable = ['employee_name', 'employee_code', 'mobile', 'place', 'maritial_status','img_file'];
}

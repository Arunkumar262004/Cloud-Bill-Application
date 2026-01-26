<?php

namespace App\Http\Controllers;

use App\Models\payslip_tbl;

use Illuminate\Http\Request;

class pay_slip_controller extends Controller
{
    public function Store_payslip(Request $request)
    {
        $request->validate([
            "emp_name" => "required|string",
            "emp_code" => "required|unique:pay_slip_data_table|integer",
            "salary" => "required|integer"
        ]);

        payslip_tbl::create([
            "emp_name" => $request->emp_name,
            "emp_code" => $request->emp_code,
            "salary" => $request->salary,
        ]);

        return response()->json([
            "message" => "Successfully created Payslip"
        ]);
    }

    public function Get_payslip()
    {
        $payslip_data =  payslip_tbl::all();
        return response()->json([
            "data" => $payslip_data
        ]);
    }

    public function Delete_payslip_id($id)
    {

        if (strlen($id) > 0) {
            $fetch_id =  payslip_tbl::find($id);

            $fetch_id->delete();
            return response()->json([
                "mesage" => "Payslip Deleted Successfully"
            ]);
        } else {
            return response()->json([
                "mesage" => "Delete Operation failed"
            ]);
        }
    }

    public function Get_payslip_by_id(Request $request, $id)
    {
        $fincd_pay_id = payslip_tbl::find($id);
        if ($fincd_pay_id) {
            $payslip_data_id =  payslip_tbl::where('id', $fincd_pay_id);

            return response()->json([
                "Message" => "success",
                "data" => $payslip_data_id
            ]);
        } else {
            return response()->json([
                "Message" => "failed"
            ]);
        }
    }
}

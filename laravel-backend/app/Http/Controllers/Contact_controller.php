<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact_model;
use App\Models\Sales;
use App\Models\Stock;

class Contact_controller extends Controller
{
    public function Create_contact(Request $request)
    {
        $request->validate([
            'employee_name'    => 'required|string|max:255',
            'employee_code'    => 'required|integer',
            'mobile'   => 'integer',
            'place'     => 'string',
            'maritial_status'           => 'string',
            'img_file'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'

        ]);

        $imageName = null;
        if ($request->hasFile('img_file') && $request->file('img_file')->isValid()) {
            $file = $request->file('img_file');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('contact', $imageName, 'public');
        }


        Contact_model::create([
            'employee_name' => $request->employee_name,
            'employee_code' => $request->employee_code,
            'mobile' => $request->mobile,
            'place' => $request->place,
            'maritial_status' => $request->maritial_status,
            'img_file'        => $imageName  // save filename in DB

        ]);
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function Contact_my_page()
    {
        $sales_values =  Contact_model::all();
        return response()->json([
            'status' => 'ok',
            'data' => $sales_values
        ]);
    }

    public function Contact_get_value_in_db($id)
    {
        $value =  Contact_model::find($id);

        return response()->json([
            'status' => 'ok',
            'data' => $value
        ]);
    }

    public function Contact_update(Request $request, $id)
    {
        $contact = Contact_model::find($id);

        if ($contact) {
            $request->validate([
                'employee_name' => 'string|max:255',
                'employee_code' => 'integer',
                'mobile' => 'integer',
                'place' => 'string',
                'maritial_status' => 'string',
                'img_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $updateData = [
                'employee_name' => $request->employee_name ?? $contact->employee_name,
                'employee_code' => $request->employee_code ?? $contact->employee_code,
                'mobile' => $request->mobile ?? $contact->mobile,
                'place' => $request->place ?? $contact->place,
                'maritial_status' => $request->maritial_status ?? $contact->maritial_status
            ];

            if ($request->hasFile('img_file') && $request->file('img_file')->isValid()) {
                $file = $request->file('img_file');
                $imageName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('contact', $imageName, 'public'); // ✅ stores in public disk
                $updateData['img_file'] = $imageName; // update DB
            }



            $contact->update($updateData);

            return response()->json(['status' => 'success']);
        }

        return response()->json(['status' => 'failed']);
    }


    public function Contact_delete($id)
    {
        $contact = Contact_model::find($id);

        if ($contact) {

            $contact->delete();
        }
    }
}

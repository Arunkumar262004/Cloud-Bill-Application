<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate_controller extends Controller
{
    public function login(Request $request){
    if (!Auth::guard('web')->attempt($request->only('email', 'password'))) {
            return response()->json([
                "message" =>"Email is not Registered"
            ]);
        };

        $user = Auth::user();

        $input['name'] = $user->name;
        $input['email'] = $user->email;
        $input['token'] = $user->createToken('authToken')->plainTextToken;

         return response()->json([
                "message" =>"success",
                'value'=> $input
            ]);
    }

    
}

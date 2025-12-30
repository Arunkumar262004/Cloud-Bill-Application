<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Authenticate_controller extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::guard('web')->attempt($request->only('email', 'password'))) {
            return response()->json([
                "message" => "Email is not Registered"
            ]);
        };

        $user = Auth::user();

        $input['name'] = $user->name;
        $input['email'] = $user->email;
        $input['token'] = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            "message" => "success",
            'value' => $input
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'success',
            'value' => [
                'name'  => $user->name,
                'email' => $user->email,
                'token' => $token
            ]
        ], 201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mail;

class otp_login_page extends Controller
{
    // Generate OTP and send email
    public function generate_otp(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                "status" => "failed",
                "message" => "Email is not registered"
            ]);
        }

        $otp = rand(100000, 900000);
        $user->update(['otp' => $otp]);

        Mail::send('emails.email-template', ['otp' => $otp], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('OTP For Your Login');
        });

        return response()->json([
            "status" => "success",
            "message" => "OTP sent successfully"
        ]);
    }

    // Confirm OTP and log in user
    public function confirm_otp(Request $request)
    {
        $user = User::where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$user) {
            return response()->json([
                "status" => "failed",
                "message" => "Invalid OTP"
            ], 401);
        }

        // Reset OTP
        $user->update(['otp' => '0']);
        $token = $user->createToken('LoginToken')->plainTextToken;



        return response()->json([
            "status" => "success",
            "message" => "OTP verified. Logged in successfully",
            "token"   => $token,
            "user" =>$user->name

        ]);
    }
}

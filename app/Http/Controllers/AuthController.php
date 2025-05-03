<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Proses login
    public function login(Request $request)
    {
        // Validasi input user
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Email atau password kosong!'
            ]);
        }

        // Mencari user berdasarkan email
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
           
            Session::put('data',Auth::user());
            Session::save();
            Session::regenerate();
            // $request->session()->regenerate();
            // $request->session()->put('user', Auth::user());
            // $request->session()->save();

            return response()->json([
                'message' => 'Login successful'
            ]);
        } else {
            return response()->json([
                'message' => 'Login Failed'
            ]);
        }
    }

    public function session()
    {
        return response()->json(['data' => session()->all()]);
    }
}

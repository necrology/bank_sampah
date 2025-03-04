<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

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
        $user = User::where('email', $request->email)->first();

        // Cek apakah user ada dan password cocok
        if ($user && Hash::check($request->password, $user->password)) {
            // Simpan id user ke session
            Session::put('user_id', $user->id_user);
            return response()->json([
                'message' => 'Login successful'
            ]);
        } else {
            return response()->json([
                'message' => 'Login Failed'
            ]);
        }
    }
}

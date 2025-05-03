<?php

use App\Http\Middleware\adminAuth;
use Illuminate\Support\Facades\Route;



Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return view('landing');
    });

    Route::get('/login', function () {
        return view('auth/login');
    })->name('login');
});

Route::middleware(adminAuth::class)->group(function () {
    Route::get('/dashboard', function () {
        return view('admin/dashboard');
    });

    Route::get('/dashboard/sampah', function () {
        return view('admin/sampah');
    });

    Route::get('/dashboard/nasabah', function () {
        return view('admin/nasabah');
    });

    Route::get('/dashboard/jadwalPenimbangan', function () {
        return view('admin/jadwalPenimbangan');
    });

    Route::get('/dashboard/penimbangan', function () {
        return view('admin/penimbangan');
    });
});
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landing');
});

Route::get('/login', function () {
    return view('auth/login');
});

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

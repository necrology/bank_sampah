<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class adminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // $isAuthenticatedAdmin = (Session::get('data'));
        // var_dump($isAuthenticatedAdmin);
        // die();

        // //This will be excecuted if the new authentication fails.
        // if (!$isAuthenticatedAdmin || $isAuthenticatedAdmin == null) {

        //     return redirect()->route('login')->with('message', 'Authentication Error.');
        // }
        return $next($request);
    }
}

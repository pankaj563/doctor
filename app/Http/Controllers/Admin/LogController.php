<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class LogController extends Controller
{
    /**
     * Display login page.
     *
     * @return Response
     */
    public function index()
    {
        print_r("expression");die;
        if(Auth::check() && Auth::user()->UserRoles->role >= 2)
        {
            return Redirect::to('/admin/dashboard');
        }

        return View('index');
    }

    /**
     * Post login credentials
     *
     * @return Response
     */
    public function login(Request $request)
    {

        $data = $request['user'];
        print_r($data);die;
        $email = isset($data['email']) ? $data['email'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $remember = isset($data['remember']) ? $data['remember'] : null;

        if(Auth::attempt(['email' => $email, 'password' => $password], $remember))
        {
            if(Auth::user()->UserRoles->role > 1)
            {
                return response()->json(["message" => "Welcome"]);
            }

            return response()->json(["The email or password you entered is not correct"], 422);
        }

        return response()->json(["The email or password you entered is not correct"], 422);
    }

    /**
     * Log out
     *
     * @return Response
     */
    public function logout()
    {
        Auth::logout();

        return Redirect::to('/admin/login');
    }

}

<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Hash;

use App\Services\Api\OAuthProxy;
use App\Http\Requests\Api\Register;
use App\User;

class RegisterController extends \App\Http\Controllers\Controller
{
    
    /**
     * Registers a new user
     * 
     * @param OAuthProxy $proxy
     * @param Register $request
     * @return \Symfony\Component\HttpFoundation\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function register(OAuthProxy $proxy, Register $request)
    {
        $name = $request->get('email');
        $email = $request->get('email');
        $password = $request->get('password');
        
        $user = new User([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);
        $user->save();
        
        return $proxy->makeRequest('password', [
            'username' => $email,
            'password' => $password
        ]);
    }
    
}

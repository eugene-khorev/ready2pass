<?php

namespace App\Http\Requests\Api;

class Login extends \App\Http\Requests\Api
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }
}
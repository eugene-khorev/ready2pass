<?php

namespace App\Http\Requests\Api;

class Password extends \App\Http\Requests\Api
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required',
            'password' => 'required'
        ];
    }
}
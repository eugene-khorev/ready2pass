<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Password;
use App\Http\Resources\Password as PasswordResource;
use App\Http\Resources\PasswordCollection;
use App\Http\Requests\Api\Password as PasswordRequest;

class PasswordController extends \App\Http\Controllers\Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new PasswordCollection(
            Password::own()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\Api\Password  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PasswordRequest $request)
    {
        $password = Password::findOrNew($request->id);
        
        $password->user_id= \Auth::id();
        $password->name = $request->get('name');
        $password->password= $request->get('password');
        $password->comment = $request->get('comment');
        $password->icon= $request->get('icon');
        $password->save();
        
        return $password;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Password  $password
     * @return \Illuminate\Http\Response
     */
    public function show(Password $password)
    {
        return new PasswordResource($password);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Password  $password
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Password $password)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Password  $password
     * @return \Illuminate\Http\Response
     */
    public function destroy(Password $password)
    {
        //
    }
}

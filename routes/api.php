<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(function() {
    Route::post('/register', 'RegisterController@register');
    Route::post('/login', 'LoginController@login');
    Route::post('/login/refresh', 'LoginController@refresh');
    Route::post('/logout', 'LoginController@logout');
    
    Route::group(['middleware' => 'auth:api'], function() {
        Route::apiResource('/passwords', 'PasswordController');
    });

});

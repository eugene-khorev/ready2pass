<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;

use App\Services\Api\OAuthProxy;
use App\Http\Requests\Api\Login;
use App\User;

class LoginController extends \App\Http\Controllers\Controller
{
    
    /**
     * Authenticates a user
     * 
     * @param OAuthProxy $proxy
     * @param Login $request
     * @return \Symfony\Component\HttpFoundation\Response|\Illuminate\Contracts\Routing\ResponseFactory
     * @throws UnauthorizedException
     */
    public function login(OAuthProxy $proxy, Login $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        $user = User::where('email', $email)->first();
        if (empty($user)) {
            throw new UnauthorizedException('Unauthorized');
        }

        return $proxy->makeRequest('password', [
            'username' => $email,
            'password' => $password
        ]);
    }

    /**
     * Refreshes OAuth token
     * 
     * @param OAuthProxy $proxy
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function refresh(OAuthProxy $proxy, Request $request)
    {
        $refreshToken = $request->cookie(env('REFRESH_TOKEN_COOKIE'));

        return $proxy->makeRequest('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    /**
     * Revokes OAuth token
     * 
     * @return \Symfony\Component\HttpFoundation\Response|\Illuminate\Contracts\Routing\ResponseFactory
     * @throws UnauthorizedException
     */
    public function logout()
    {
        $user = \Auth::guard('api')->user();
        if (empty($user)) {
            throw new UnauthorizedException('Unauthorized');
        }
        
        $accessToken = $user->token();
        \DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);
        $accessToken->revoke();

        return response(null, 204)->withCookie(
                \Cookie::forget(env('REFRESH_TOKEN_COOKIE'))
            );
    }
    
}

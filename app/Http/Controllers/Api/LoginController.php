<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;

use App\Http\Requests\Api\Login;
use App\User;

class LoginController extends \App\Http\Controllers\Controller
{
    
    const REFRESH_TOKEN_COOKIE = 'refreshToken';
    
    public function login(Login $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        $user = User::where('email', $email)->first();

        if (empty($user)) {
            throw new UnauthorizedException('Unauthorized');
        }

        return $this->proxy('password', [
            'username' => $email,
            'password' => $password
        ]);
    }

    public function refresh(Request $request)
    {
        $refreshToken = $request->cookie(self::REFRESH_TOKEN_COOKIE);

        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    public function logout()
    {
        $user = \Auth::guard('api')->user();
        if (empty($user)) {
            throw new UnauthorizedException('Unauthorized');
        }
        
        $accessToken = $user->token();
        $this->db
            ->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);
        $accessToken->revoke();

        return response(null, 204)->withCookie(
                \Cookie::forget(self::REFRESH_TOKEN_COOKIE)
            );
    }
    
    /**
     * Proxy a request to the OAuth server.
     *
     * @param string $grantType what type of grant type should be proxied
     * @param array $data the data to send to the server
     */
    private function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id'     => env('PASSWORD_CLIENT_ID'),
            'client_secret' => env('PASSWORD_CLIENT_SECRET'),
            'grant_type'    => $grantType
        ]);

        $response = app('apiconsumer')->post('/oauth/token', $data);

        if (!$response->isSuccessful()) {
            throw new UnauthorizedException('Unauthorized');
        }

        $result = json_decode($response->getContent());

        // Create a refresh token cookie
        return response([
            'access_token' => $result->access_token,
            'expires_in' => $result->expires_in
        ])->cookie(
            self::REFRESH_TOKEN_COOKIE,
            $result->refresh_token,
            env('REFRESH_TOKEN_EXPIRES_IN_DAYS') * 24 * 60
        );
    }
    
}

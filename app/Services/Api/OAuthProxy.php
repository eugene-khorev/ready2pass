<?php

namespace App\Services\Api;

use Illuminate\Validation\UnauthorizedException;

/**
 * Emulates Laravel Passport OAuth requests
 */
class OAuthProxy
{
    /**
     * OAuth client ID
     * @var string
     */
    protected $clientId;
    
    /**
     * OAuth client secret
     * @var string
     */
    protected $clientSecret;
    
    /**
     * Refresh token cookie name
     * @var string
     */
    protected $refrechTokenCookie;
    
    /**
     * Expiration time of OAuth refresh token (in days)
     * @var int
     */
    protected $refrechTokenExpires;

    /**
     * Constructor
     * 
     * @param type $clientId OAuth client ID
     * @param type $clientSecret OAuth client secret
     * @param type $refrechTokenCookie Cookie name
     * @param type $refrechTokenExpires In days
     */
    public function __construct($clientId, $clientSecret, $refrechTokenCookie, $refrechTokenExpires)
    {
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->refrechTokenCookie = $refrechTokenCookie;
        $this->refrechTokenExpires = $refrechTokenExpires;
    }
    
    /**
     * Proxy a request to the OAuth server.
     *
     * @param string $grantType what type of grant type should be proxied
     * @param array $data the data to send to the server
     */
    public function makeRequest($grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id'     => $this->clientId,
            'client_secret' => $this->clientSecret,
            'grant_type'    => $grantType,
        ]);

        $response = app('apiconsumer')->post('/oauth/token', $data);
        if (!$response->isSuccessful()) {
            throw new UnauthorizedException('Unauthorized');
        }
        $result = json_decode($response->getContent());

        // Create response within refresh token cookie
        return response([
            'access_token' => $result->access_token,
            'expires_in' => $result->expires_in
        ])->cookie(
            $this->refrechTokenCookie,
            $result->refresh_token,
            $this->refrechTokenExpires * 24 * 60
        );
    }
}
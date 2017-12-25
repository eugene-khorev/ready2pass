<?php

return [
    'client_id' => env('PASSWORD_CLIENT_ID', null),
    'client_secret' => env('PASSWORD_CLIENT_SECRET', null),
    'token_expires_in_nimutes' => env('TOKEN_EXPIRES_IN_MINUTES', null),
    'refresh_token_cookie' => env('REFRESH_TOKEN_COOKIE', null),
    'refresh_token_expires_in_days' => env('REFRESH_TOKEN_EXPIRES_IN_DAYS', null),
];

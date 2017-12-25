<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('App\Services\Api\OAuthProxy', function ($app) {
            return new \App\Services\Api\OAuthProxy(
                    config('oauth.client_id'),
                    config('oauth.client_secret'),
                    config('oauth.refresh_token_cookie'),
                    config('oauth.refresh_token_expires_in_days')
                );
        });
    }
}

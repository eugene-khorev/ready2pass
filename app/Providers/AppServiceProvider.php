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
                    env('PASSWORD_CLIENT_ID'),
                    env('PASSWORD_CLIENT_SECRET'),
                    env('PASSWORD_CLIENT_SECRET'),
                    env('REFRESH_TOKEN_EXPIRES_IN_DAYS')
                );
        });
    }
}

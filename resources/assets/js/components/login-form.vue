<template>
    <form class="form-horizontal" v-on:submit.prevent="onLogin">
        <div class="form-group has-error">
            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

            <div class="col-md-6">
                <input id="email" type="email" class="form-control" name="email" placeholder="E-mail" required autofocus v-model="email" :disabled="isInputDisabled">

                @if ($errors->has('email'))
                <span class="help-block">
                    <strong>$errors->first('email')</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="form-group has-error">
            <label for="password" class="col-md-4 control-label">Password</label>

            <div class="col-md-6">
                <input id="password" type="password" class="form-control" name="password" required v-model="password" :disabled="isInputDisabled">

                @if ($errors->has('password'))
                <span class="help-block">
                    <strong>$errors->first('password')</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-8 col-md-offset-4">
                <button type="submit" class="btn btn-primary" :disabled="isInputDisabled">
                    Login
                </button>

                <a class="btn btn-link" href="route('password.request')">
                    Forgot Your Password?
                </a>
            </div>
        </div>
    </form>
</template>

<script src="./login-form.js"></script>

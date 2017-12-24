<template>
    <form class="form-horizontal" v-on:submit.prevent="onLogin">
        <div class="form-group" v-bind:class="{ 'has-error': errors['email'] }">
            <label for="email" class="col-md-4 control-label">{{ $trans('forms.email') }}</label>

            <div class="col-md-6">
                <input id="email" type="text" class="form-control" name="email" placeholder="E-mail" autofocus v-model="email" :disabled="isInputDisabled">
                <span class="help-block" v-if="errors['email']">
                    <strong v-for="message in errors['email']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group" v-bind:class="{ 'has-error': errors['password'] }">
            <label for="password" class="col-md-4 control-label">{{ $trans('forms.password') }}</label>

            <div class="col-md-6">
                <input id="password" type="password" class="form-control" name="password" v-model="password" :disabled="isInputDisabled">
                <span class="help-block" v-if="errors['password']">
                    <strong v-for="message in errors['password']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-8 col-md-offset-4">
                <button type="submit" class="btn btn-primary" :disabled="isInputDisabled">{{ $trans('forms.login') }}</button>

                <a class="btn btn-link" href="/#reset">{{ $trans('forms.forgot_password') }}</a>
            </div>
        </div>
    </form>
</template>

<script src="./login-form.js"></script>

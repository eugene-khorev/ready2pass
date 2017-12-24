<template>
    <form class="form-horizontal" v-on:submit.prevent="onRegister">
        <div class="form-group" v-bind:class="{ 'has-error': errors['name'] }">
            <label for="name" class="col-md-4 control-label">{{ $trans('forms.name') }}</label>

            <div class="col-md-6">
                <input id="name" type="text" class="form-control" name="name" v-model="name" autofocus>
                <span class="help-block" v-if="errors['name']">
                    <strong v-for="message in errors['name']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group" v-bind:class="{ 'has-error': errors['email'] }">
            <label for="email" class="col-md-4 control-label">{{ $trans('forms.email') }}</label>

            <div class="col-md-6">
                <input id="email" type="text" class="form-control" name="email" v-model="email">
                <span class="help-block" v-if="errors['email']">
                    <strong v-for="message in errors['email']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group" v-bind:class="{ 'has-error': errors['password'] }">
            <label for="password" class="col-md-4 control-label">{{ $trans('forms.password') }}</label>

            <div class="col-md-6">
                <input id="password" type="password" class="form-control" name="password" v-model="password">
                <span class="help-block" v-if="errors['password']">
                    <strong v-for="message in errors['password']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group">
            <label for="password-confirm" class="col-md-4 control-label">{{ $trans('forms.password_confirmation') }}</label>

            <div class="col-md-6">
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" v-model="password_confirmation">
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <button type="submit" class="btn btn-primary">{{ $trans('forms.register') }}</button>
            </div>
        </div>
    </form>
</template>

<script src="./registration-form.js"></script>

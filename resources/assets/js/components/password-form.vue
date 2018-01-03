<template>
    <form class="form-horizontal" v-on:submit.prevent="onSave">
        <div class="form-group" v-bind:class="{ 'has-error': errors['email'] }">
            <label for="name" class="col-md-4 control-label">{{ $trans('forms.password-name') }}</label>

            <div class="col-md-6">
                <input id="name" type="text" class="form-control" name="name" autofocus v-model="name" :disabled="isInputDisabled">
                <span class="help-block" v-if="errors['email']">
                    <strong v-for="message in errors['email']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group" v-bind:class="{ 'has-error': errors['password'] }">
            <label for="password" class="col-md-4 control-label">{{ $trans('forms.password') }}</label>

            <div class="col-md-6">
                <input id="password" type="text" class="form-control" name="password" v-model="password" :disabled="isInputDisabled">
                <span class="help-block" v-if="errors['password']">
                    <strong v-for="message in errors['password']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group" v-bind:class="{ 'has-error': errors['comment'] }">
            <label for="comment" class="col-md-4 control-label">{{ $trans('forms.comment') }}</label>

            <div class="col-md-6">
                <textarea id="comment" type="text" class="form-control" name="comment" v-model="comment" :disabled="isInputDisabled"></textarea>
                <span class="help-block" v-if="errors['comment']">
                    <strong v-for="message in errors['comment']">{{ message }}</strong>
                </span>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-8 col-md-offset-4">
                <button type="submit" class="btn btn-primary" :disabled="isInputDisabled">{{ $trans('forms.save') }}</button>

                <a class="btn btn-link" href="/#/passwords">{{ $trans('forms.cancel') }}</a>
            </div>
        </div>
    </form>
</template>

<script src="./password-form.js"></script>

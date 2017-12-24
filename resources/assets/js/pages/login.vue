<template>
    <div class="panel panel-default">
        <div class="panel-heading">{{ $trans('pages.login') }}</div>

        <div class="panel-body">
            <login-form v-on:authenticated="authenticated"></login-form>
        </div>
    </div>
</template>

<script src="./login.js"></script>

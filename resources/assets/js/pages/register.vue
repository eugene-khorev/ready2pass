<template>
    <div class="panel panel-default">
        <div class="panel-heading">{{ $trans('pages.register') }}</div>

        <div class="panel-body">
            <registration-form v-on:registred="registred"></registration-form>
        </div>
    </div>
</template>

<script src="./register.js"></script>

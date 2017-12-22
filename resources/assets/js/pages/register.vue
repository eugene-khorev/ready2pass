<template>
    <main-layout :isUserAuthorized="isUserAuthorized">
        <div class="panel panel-default">
            <div class="panel-heading">Register</div>

            <div class="panel-body">
                <registration-form></registration-form>
            </div>
        </div>
    </main-layout>
</template>

<script src="./register.js"></script>

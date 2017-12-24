<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <navigation :isUserAuthorized="$auth.isUserAuthorized()" :items="routes"></navigation>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script src="./app-container.js"></script>

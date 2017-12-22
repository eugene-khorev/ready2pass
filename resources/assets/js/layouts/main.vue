<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <navigation :isUserAuthorized="isUserAuthorized"></navigation>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script src="./main.js"></script>

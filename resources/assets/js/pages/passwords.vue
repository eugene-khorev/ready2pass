<template>
    <div class="panel panel-default">
        <div class="panel-heading">{{ $trans('navigation.passwords') }}</div>

        <div class="panel-body">
          <ul class="media-list">
            <password v-for="pwd in items" :key="pwd.id" :id="pwd.id" :name="pwd.name" :password="pwd.password" :comment="pwd.comment" :icon="pwd.icon"></password>
          </ul>
        </div>
    </div>
</template>

<script src="./passwords.js"></script>

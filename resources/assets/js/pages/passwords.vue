<template>
    <div class="panel panel-default">
        <div class="panel-heading">
          {{ $trans('navigation.passwords') }}
          <div class="pull-right">
            <a href="/#/passwords/new" class="btn btn-xs btn-primary">
                {{ $trans('navigation.password-new') }}
            </a>
          </div>
        </div>

        <div class="panel-body">
          <ul class="media-list">
            <password v-for="pwd in items" :key="pwd.id" :id="pwd.id" :name="pwd.name" :password="pwd.password" :comment="pwd.comment" :icon="pwd.icon"></password>
          </ul>
        </div>
    </div>
</template>

<script src="./passwords.js"></script>

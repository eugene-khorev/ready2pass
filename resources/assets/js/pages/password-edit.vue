<template>
    <div class="panel panel-default">
        <div class="panel-heading">{{ $trans('navigation.password-item') }}</div>

        <div class="panel-body">
          <ul class="media-list">
            <password-form :data="password"></password-form>
          </ul>
        </div>
    </div>
</template>

<script src="./password-edit.js"></script>

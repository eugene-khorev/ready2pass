<template>
    <li v-bind:class="{ active: isActive }">
        <a :href="'/#' + hash">
            {{ $trans(title) }}
            <span v-if="isActive" class="sr-only">(current)</span>
        </a>
    </li>
</template>

<script src="./navigation-link.js"></script>

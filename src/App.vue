<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
  <RouterView />
</template>

<style scoped></style>

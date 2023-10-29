<template>
  <ul class="user-data__list">
    <RecursiveTable :data="userData"/>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { TUserData } from '@/types';

let userData = reactive<TUserData>({} as any);
const loginParams = localStorage.getItem('loginParams');

if (loginParams) {
  userData = JSON.parse(loginParams) as TUserData;
}
</script>

<style lang="scss">
.user-data {
  &__list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;

    @media (max-width: 426px) {
      max-width: 18rem;
    }
  }
}
</style>

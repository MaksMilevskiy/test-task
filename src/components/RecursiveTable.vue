<template>
  <div class="recursive-table__row" v-for="(value, key) in data" :key="key">
    <span class="recursive-table__key">{{ key }}: </span>
    <span v-if="isObject(value)" class="recursive-table__object-value">
      <RecursiveTable :data="value" />
    </span>
    <span v-else class="recursive-table__value">
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { TUserData } from '@/types';
import { defineProps } from 'vue';

defineProps<{
  data: TUserData;
}>();

const isObject = (value: any) => typeof value === 'object' && value !== null;
</script>

<style lang="scss">
.recursive-table {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0 0.5rem 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__key,
  &__object-value,
  &__value {
    font-size: 1rem;
  }

  &__key {
    font-weight: 700;
    margin-right: 0.5rem;
  }
}
</style>

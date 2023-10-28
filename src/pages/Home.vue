<template>
  <div class="home-page__wrapper">
    <DataForm />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import DataForm from '@/components/DataForm.vue';
import TodoList from '@/components/TodoList.vue';
</script>

<style lang="scss">
.home-page__wrapper {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: Roboto;
}

@media screen and (max-width: 768px) {
  .home-page__wrapper {
    padding: 1rem;
  }
}
</style>

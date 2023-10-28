<template>
  <li class="todo-item__wrapper">
    <div class="todo-item__field-group">
      <p class="todo-item__status-text">completed</p>
      <input
        class="todo-item__checkbox"
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggleComplete', todo)"
      />
    </div>
    <h2 class="todo-item__title">{{ todo.title }}</h2>
    <button
      class="todo-item__favorite-button"
      :class="favourite ? 'favourite' : null"
      @click="$emit('toggleFavorite', todo)"
    >
      Favorite
    </button>
  </li>
</template>

<script setup lang="ts">
import type { TTodoItem } from '@/types';

defineProps<{
  todo: TTodoItem;
  favourite?: boolean;
}>();
const emit = defineEmits(['toggleComplete', 'toggleFavorite']);
</script>

<style lang="scss" scoped>
.todo-item {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__field-group {
    flex: 1;
    display: flex;
    align-items: center;
  }

  &__status-text {
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.8rem;
  }

  &__title {
    flex: 2;
    font-size: 1.1rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
  }

  &__favorite-button {
    font-size: 0.9rem;
    border: none;
    padding: 0.6rem 1rem;
    background-color: #e91e63;
    color: #fff;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.25s;
  }

  &__favorite-button.favourite {
    background-color: lightgreen;
  }

  &__favorite-button:hover {
    background-color: #c2185b;
  }

  &__favorite-button.favourite:hover {
    background-color: darkgreen;
  }

  @media screen and (max-width: 600px) {
    &__wrapper {
      flex-direction: column;
      align-items: flex-start;
    }

    &__title {
      margin-bottom: 1rem;
    }
    &__favorite-button {
      margin-top: 1rem;
    }
  }
}
</style>

<template>
  <div class="todo-list__wrapper">
    <div class="todo-list__filters">
      <select v-model="statusFilter" @change="filterData">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="favorites">Favorites</option>
      </select>
      <select v-model="userFilter" @change="filterData">
        <option value="all">All users</option>
        <option v-for="user in users" :key="user" :value="user">
          {{ user }}
        </option>
      </select>
      <input
        type="text"
        v-model="searchFilter"
        @input="filterData"
        placeholder="Search by title..."
      />
    </div>
    <div class="todo-list__create-todo">
      <input type="number" v-model="userIdInput" placeholder="User ID" />
      <input type="text" v-model="titleInput" placeholder="Title" />
      <button @click="addTodo">Add</button>
    </div>
    <ul class="todo-list">
      <CustomTodoItem
        v-for="todo in filteredTodos"
        :todo="todo"
        :key="todo.id"
        :favourite="getFavourite(todo.id) ? true : false"
        @toggle-complete="toggleComplete"
        @toggle-favorite="toggleFavorite"
      />
    </ul>
    <div class="todo-list__pagination">
      <button :disabled="!isAvailablePreviousPage" @click="previousPage">Previous page</button>
      <button :disabled="!isAvailableNextPage" @click="nextPage">Next page</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CustomTodoItem from './CustomTodoItem.vue';

export type TTodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const todos = ref<TTodoItem[]>([]);
const filteredTodos = ref<TTodoItem[]>([]);
const statusFilter = ref<'all' | 'completed' | 'uncompleted' | 'favorites'>(
  'all'
);
const userFilter = ref<string>('all');
const searchFilter = ref<string>('');
const userIdInput = ref<number | null>();
const titleInput = ref<string>('');
const users = ref<any[]>([]);
const currentPage = ref<number>(1);
const todosPerPage = ref<number>(10);

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  todos.value = await response.json();
  filterData();

  users.value = [...new Set(todos.value.map((todo: TTodoItem) => todo.userId))];
});

const isAvailablePreviousPage = computed(() => {
  return currentPage.value > 1;
});
const isAvailableNextPage = computed(() => {
  return (
    currentPage.value <= Math.floor(todos.value.length / todosPerPage.value)
  );
});

const filterData = () => {
  let tempTodos = [...todos.value];

  if (statusFilter.value !== 'all') {
    tempTodos = tempTodos.filter((todo) => {
      if (statusFilter.value === 'completed') return todo.completed;

      if (statusFilter.value === 'uncompleted') return !todo.completed;

      if (statusFilter.value === 'favorites')
        return localStorage.getItem(`fav-${todo.id}`);

      return true;
    });
  }

  if (userFilter.value !== 'all') {
    tempTodos = tempTodos.filter(
      (todo) => todo.userId.toString() == userFilter.value
    );
  }

  if (searchFilter.value) {
    tempTodos = tempTodos.filter((todo) =>
      todo.title.toLowerCase().includes(searchFilter.value.toLowerCase())
    );
  }

  const paginationStartIndex = (currentPage.value - 1) * todosPerPage.value;

  filteredTodos.value = tempTodos.slice(
    paginationStartIndex,
    paginationStartIndex + todosPerPage.value
  );
};

const addTodo = async () => {
  try {
    if (!userIdInput.value) {
      return;
    }
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${+userIdInput.value}/todos`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: +userIdInput.value,
          id: new Date().getTime(),
          title: titleInput.value,
          completed: false,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );

    let newTodo = await response.json();
    todos.value = [newTodo, ...todos.value];
    filterData();
    userIdInput.value = null;
    titleInput.value = '';
  } catch (err: any) {
    console.log(err);
  }
};

const toggleComplete = (todo: TTodoItem) => {
  todo.completed = !todo.completed;
};

const getFavourite = (todoId: number) => {
  return localStorage.getItem(`fav-${todoId}`);
};
const toggleFavorite = (todo: TTodoItem) => {
  if (getFavourite(todo.id)) {
    localStorage.removeItem(`fav-${todo.id}`);
  } else {
    localStorage.setItem(`fav-${todo.id}`, '1');
  }
  filterData();
};

const previousPage = () => {
  if (isAvailablePreviousPage.value) {
    currentPage.value -= 1;
    filterData();
  }
};
const nextPage = () => {
  if (isAvailableNextPage.value) {
    currentPage.value += 1;
    filterData();
  }
};
</script>

<style lang="scss" scoped>
.todo-list__wrapper {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.todo-list__filters,
.todo-list__create-todo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.todo-list__create-todo input,
.todo-list__filters select,
.todo-list__filters input {
  flex: 1;
  margin-right: 1rem;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #aaa;
}

.todo-list__create-todo button,
.todo-list__pagination button {
  color: #fff;
  background-color: #4285f4;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.todo-list__create-todo button:hover,
.todo-list__pagination button:hover {
  background-color: #226ce0;
}

.todo-list__pagination button:disabled {
  background-color: gainsboro;
}
.todo-list__pagination button:disabled:hover {
  background-color: none;
  cursor: not-allowed;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-list__pagination {
  display: flex;
  gap: 20px;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .todo-list__filters,
  .todo-list__create-todo {
    flex-direction: column;
  }

  .todo-list__create-todo input,
  .todo-list__filters select,
  .todo-list__filters input {
    margin-bottom: 1rem;
  }

  .todo-list__create-todo button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>

<template>
  <ul class="user-form__wrapper">
    <h1 class="user-form__title">Your data</h1>
    <li class="user-data__item" v-for="(value, key) in userData">
      <template v-if="typeof value == 'string' || key == 'id'">
        <span class="user-data__label">{{ key }}:</span>
        <span class="user-data__value">{{ value }}</span>
      </template>
      <template v-else>
        <span class="user-data__label user-data__parent">{{ key }}:</span>
        <div class="user-form__nested-block">
          <li
            v-for="(childValue, childKey) in value"
            class="user-form__nested-group"
          >
            <template v-if="typeof childValue == 'string'">
              <div>
                <span class="user-data__label">{{ childKey }}:</span>
                <span class="user-data__value">{{ childValue }}</span>
              </div>
            </template>
            <template v-else>
              <span class="user-data__label user-data__parent"
                >{{ childKey }}:</span
              >
              <div class="user-form__nested-block">
                <li
                  v-for="(nestedValue, nestedKey) in childValue"
                  class="user-form__nested-group"
                >
                  <div>
                    <span class="user-data__label">{{ nestedKey }}:</span>
                    <span class="user-data__value">{{ nestedValue }}</span>
                  </div>
                </li>
              </div>
            </template>
          </li>
        </div>
      </template>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

export type TUserData = {
  id: number;
  [key: string]: string | number | { [key: string]: string | number };
};

const loginParams = localStorage.getItem('loginParams');

let userData = reactive<TUserData>({} as any);

if (loginParams) {
  userData = JSON.parse(loginParams) as TUserData;
}
</script>

<style scoped lang="scss">
.user-form__wrapper {
  list-style: none;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.user-data__item {
  margin-bottom: 1rem;
}

.user-form__nested-block {
  margin-left: 1rem;
  border-left: 2px solid #dfe4ea;
  padding-left: 1rem;
}
.user-form__nested-group {
  margin: .5rem 0;
}

.user-data__label {
  font-weight: bold;
  display: inline-block;
  min-width: 100px;
}

.user-data__parent {
}

.user-data__value {
  font-weight: 500;
}

@media screen and (max-width: 768px) {
  .user-data__item {
    padding: 1rem 0;
    border-bottom: 1px solid gray;
  }

  .user-form__nested-block,
  .user-form__nested-group {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
  }
}
</style>

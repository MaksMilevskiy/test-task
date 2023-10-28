<template>
  <div :class="isEnabledNewTheme ? 'new' : 'old'" class="login-form__template">
    <div class="login-form__wrapper">
      <h1 class="login-form__title">Login</h1>
      <form class="login-form__body" @submit="validateForm">
        <div class="login-form__input-group">
          <CustomInput
            v-model="username.value"
            :errorMessage="username.errorMessage"
            :isError="username.isError"
            @input="() => handleInput(username)"
            label="Username"
            placeholder="Username"
          />
          <CustomInput
            v-model="phone.value"
            :errorMessage="phone.errorMessage"
            :isError="phone.isError"
            @input="() => handleInput(phone)"
            placeholder="Phone number"
          />
        </div>
        <div
          class="login-form__error"
          v-if="formError.isError && formError.errorText"
        >
          {{ formError.errorText }}
        </div>
        <button class="login-form__button" type="submit">Register</button>
      </form>
    </div>
    <div class="login-form__theme-selector">
      <label for="switch">Use new theme</label>
      <label class="login-form___switch">
        <input id="switch" type="checkbox" v-model="isEnabledNewTheme" />
        <span class="login-form___slider"></span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '@/router';
import CustomInput from '@/components/CustomInput.vue';
import type { TInputData, TFetchedUser } from '@/types';

const username = reactive<TInputData>({
  value: '',
  validationRegex: /^[a-zA-Z]+$/,
  errorMessage: 'Enter valid username',
  isError: false,
});
const phone = reactive<TInputData>({
  value: '',
  validationRegex: /^[0-9 x.\-+)(]+$/,
  errorMessage: 'Enter valid phone number',
  isError: false,
});
const formError = reactive({
  errorText: '',
  isError: false,
});
const isEnabledNewTheme = ref<boolean>(false);

const fetchUserNames = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await data.json();
  return users;
};
const handleInput = (field: TInputData) => {
  field.isError = false;
  formError.isError = false;
};

const validateForm = async (e: Event) => {
  e.preventDefault();
  if (!username.value || !phone.value) {
    formError.errorText = 'Fields must not be empty';
    formError.isError = true;
    return;
  }

  [username, phone].forEach((field) => {
    if (!field.validationRegex.test(field.value)) {
      field.isError = true;
      formError.isError = true;
      formError.errorText = '';
      return;
    }
  });

  if (!formError.isError) {
    let users: TFetchedUser[] = await fetchUserNames();
    let matchingUser: TFetchedUser | null = null;
    users.forEach((user) => {
      if (user.username == username.value && user.phone == phone.value) {
        matchingUser = user;
        return;
      }
    });

    if (matchingUser) {
      localStorage.setItem('isLoggenIn', 'true');
      localStorage.setItem('loginParams', JSON.stringify(matchingUser));
      router.push('/');
    } else {
      formError.errorText = 'Login error';
      formError.isError = true;
    }
  }
};
</script>

<style lang="scss">
.login-form {
  &__template {
    padding-top: 20px;
  }

  &__theme-selector {
    position: absolute;
    top: 20px;
    right: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 200px;
    color: #5f5f5f;
    font-family: Roboto;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.425px;
    text-align: center;
  }
  &___switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  &___switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  &___slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }
  &___slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + &___slider {
    background-color: #2196f3;
  }
  input:focus + &___slider {
    box-shadow: 0 0 1px #2196f3;
  }
  input:checked + &___slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
}

.new {
  .input-wrapper input {
    border: 1px solid black;
  }
  .login-form {
    &__wrapper {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fefefe;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    &__title {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1.5em;
      color: #333;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__input-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__error {
      color: red;
      margin-bottom: 1rem;
    }

    &__button {
      padding: 0.6rem 1.2rem;
      background-color: #4285f4;
      color: #ffffff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      font-weight: bold;
    }

    &__button:hover {
      background-color: #226ce0;
    }

    @media screen and (max-width: 768px) {
      &__wrapper {
        margin: 1rem auto;
        padding: 1rem;
      }

      &__title {
        margin-bottom: 1rem;
        font-size: 1.2em;
      }

      &__button {
        padding: 0.5rem 1rem;
      }
    }
  }
}
.old {
  .login-form {
    &__wrapper {
      max-width: 447px;
      margin: auto;
      border: 0;
      border-radius: 5px;
    }

    &__title {
      padding: 15px 0;
      margin: 0;
      background-color: #a5a5a5;
      color: #5f5f5f;
      font-family: Roboto;
      font-size: 17px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.425px;
      text-align: center;
    }

    &__body {
      background-color: #c3c3c3;
      padding: 14px 25px 30px;
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    &__input-group {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &__button {
      padding: 10px 30px;
      border: 0;
      border-radius: 5px;
      background: #519945;
      color: #fff;
      font-family: Roboto;
      font-size: 17px;
      font-style: normal;
      font-weight: 600;
      line-height: 21px;
      letter-spacing: -0.425px;
    }

    &__error {
      color: red;
      font-family: Roboto;
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.375px;
    }
  }
}
</style>

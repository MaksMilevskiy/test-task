<template>
  <div class="login__form-wrapper">
    <h1 class="login__form-title">Login</h1>
    <form class="login__form-body" @submit="validateForm">
      <div class="login__form-input-group">
        <CustomInput
          ref="usernameInput"
          v-model="username.value"
          :errorMessage="username.errorMessage"
          :isError="username.isError"
          label="Username"
          placeholder="Username"
        />
        <CustomInput
          ref="phoneInput"
          v-model="phone.value"
          :errorMessage="phone.errorMessage"
          :isError="phone.isError"
          placeholder="Phone number"
        />
      </div>
      <div class="login__form-error" v-if="formError.isError">
        {{ formError.errorText }}
      </div>
      <button class="login__form-button" type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import router from '@/router';
import { reactive } from 'vue';

type TInputData = {
  value: string;
  validationRegex: RegExp;
  errorMessage: string;
  isError: boolean;
};

type TFetchedUser = {
  username: string;
  phone: string;
  [key: string]: string;
};

const username = reactive<TInputData>({
  value: '',
  validationRegex: /[a-zA-Z]/,
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

const fetchUserNames = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await data.json();
  return users;
};

const validateForm = async (e: Event) => {
  e.preventDefault();
  let isFormValid = true;
  if (!username.value || !phone.value) {
    formError.errorText = 'Fields must not be empty';
    formError.isError = true;
    setTimeout(() => {
      formError.isError = false;
    }, 2000);
    return;
  }

  [username, phone].forEach((field) => {
    if (!field.validationRegex.test(field.value)) {
      field.isError = true;
      isFormValid = false;
      setTimeout(() => {
        field.isError = false;
        isFormValid = true;
      }, 2000);
      return;
    }
  });

  if (isFormValid) {
    let users = await fetchUserNames();
    users.forEach((user: TFetchedUser) => {
      if (user.username == username.value && user.phone == phone.value) {
        localStorage.setItem('isLoggenIn', 'true')
        router.push('/');
      } else {
        formError.errorText = 'Login error';
        formError.isError = true;
        setTimeout(() => {
          formError.isError = false;
        }, 2000);
      }
    });
  }
};
</script>

<style scoped lang="scss">
.login__form-wrapper {
  max-width: 447px;
  margin: auto;
  border: 0;
  border-radius: 5px;

  .login__form-title {
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

  .login__form-body {
    background-color: #c3c3c3;
    padding: 14px 25px 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .login__form-input-group {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .login__form-button {
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

    .login__form-error {
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

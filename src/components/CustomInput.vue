<template>
  <div class="input__wrapper">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="input"
      :placeholder="placeholder"
    />
    <div class="input__error" v-if="isError">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string;
  modelValue: string;
  errorMessage?: string;
  isError?: boolean;
  placeholder?: string;
}>();
const emit = defineEmits(['update:modelValue', 'input']);

const input = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target) {
    return;
  }
  emit('input', target.value);
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss">
.input {
  &__wrapper {
    display: flex;
    flex-direction: column;

    input,
    input::placeholder {
      color: #353535;
      font-family: Roboto;
      font-size: 17px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.425px;
    }

    input {
      padding: 10px;
      border: 0;
      border-radius: 5px;
      background-color: #ffffff;
    }

    label {
      color: #5f5f5f;
      font-family: Roboto;
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.375px;
      margin-bottom: 14px;
    }
  }

  &__error {
    color: red;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.375px;
    margin-top: 14px;
  }
}
</style>

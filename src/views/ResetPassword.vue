<template>
  <div class="w-full mx-auto max-w-xs relative top-24">
    <form
      @submit.prevent="doReset"
      class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="email"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            leading-tight
            focus:outline-none
            focus:shadow-outline
          "
          id="email"
          type="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="!isLoading"
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none
            focus:shadow-outline
            w-full
          "
          type="submit"
        >
          Reset Password
        </button>
        <button
          v-else
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            px-4
            py-2
            border border-transparent
            text-base
            leading-6
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-500
            focus:outline-none
            focus:border-indigo-700
            focus:shadow-outline-indigo
            active:bg-indigo-700
            transition
            ease-in-out
            duration-150
            cursor-not-allowed
            w-full
          "
          disabled
        >
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962
               0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Procesando
        </button>
      </div>
      <a
        class="
          block
          align-baseline
          font-bold
          text-xs text-blue-500
          hover:text-blue-800
          mt-6
          text-center
        "
        href="#"
      >
        Espera acabo de recordarlo!
      </a>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2021 Juan José Pau. Todos los derechos reservados.
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ResetPassword',
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const email = ref('');

    async function doReset() {
      if (email.value) {
        isLoading.value = true;
        try {
          await store.dispatch('user/doReset', email.value);
          email.value = '';
        } catch (error) {
          console.error(error.message);
        } finally {
          isLoading.value = false;
        }
      }
    }

    return { isLoading, email, doReset };
  },
};
</script>

<style>
</style>

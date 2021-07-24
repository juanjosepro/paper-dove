<template>
  <div class="w-full mx-auto max-w-xs relative top-20">
    <form
      @submit.prevent="doRegister"
      class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="name">
          Nombre
        </label>
        <input
          v-model="userData.name"
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
          id="name"
          type="name"
          placeholder="Nombre"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">
          Email
        </label>
        <input
          v-model="userData.email"
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
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          for="password"
        >
          Contraseña
        </label>
        <input
          v-model="userData.password"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none
            focus:shadow-outline
          "
          id="password"
          type="password"
          placeholder="******************"
          autocomplete="on"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="!isLoading"
          class="
            bg-green-500
            hover:bg-green-600
            text-white
            w-full
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none
            focus:shadow-outline
          "
          type="submit"
        >
          Registrarme
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
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2021 Juan José Pau. Todos los derechos reservados.
    </p>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterUser',
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(false);
    const userData = reactive({
      name: '',
      email: '',
      password: '',
    });

    async function doRegister() {
      if (userData.name || userData.email || userData.password) {
        isLoading.value = true;
        try {
          await store.dispatch('user/doRegister', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
          });

          userData.name = '';
          userData.email = '';
          userData.password = '';

          router.push({ name: 'Home' });
        } catch (error) {
          console.error(error.message);
        } finally {
          isLoading.value = false;
        }
      }
    }

    return { isLoading, userData, doRegister };
  },
};
</script>

<style>
</style>

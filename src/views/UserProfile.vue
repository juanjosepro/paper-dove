<template>
  <div class="w-full mx-auto mt-10 max-w-xs">
    <form @submit.prevent="updateProfile" class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name Full
        </label>
        <input v-model="userData.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="name"
          :placeholder="user.displayName">

      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="userData.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          :placeholder="user.email">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="userData.password" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button v-if="!isLoading" :disabled="!hasDataChanged" class="bg-green-600 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Update Profile
        </button>
        <button v-else type="button" class="inline-flex items-center px-4 py-2 border border-transparent
          text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500
          focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700
          transition ease-in-out duration-150 cursor-not-allowed" disabled>
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando
        </button>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';

export default {
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const userData = reactive({
      name: "",
      email: "",
      password: "",
    });

    const user = computed(() => store.state.user.user);
    const hasDataChanged = computed(() => {
      return(
        (userData.name && userData.name !== user.displayName) ||
        (userData.email && userData.email !== user.email) ||
        (userData.password.length)
      )
    });

    async function updateProfile() {
      isLoading.value = true;

      try {
        await store.dispatch("user/updateProfile", {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        });

        userData.name = "";
        userData.email = "";
        userData.password = "";
      } catch (error) {
        console.error(error.message);
      } finally {
        isLoading.value = false;
      }
    }

    return { isLoading, userData, user, hasDataChanged, updateProfile }
  }
}
</script>

<style>

</style>
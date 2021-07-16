<template>
  <div class="w-full mx-auto mt-10 max-w-xs">
    <form @submit.prevent="updateRoom" class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Nombre de la sala
        </label>
        <input v-model="roomData.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="name" placeholder="Nombre">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
          Descripcion de la sala
        </label>
        <textarea v-model="roomData.description" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="descripción" type="text" placeholder="..." />
      </div>
      <div class="flex items-center justify-between">
        <button v-if="!isLoading" class="w-full uppercase bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Actualizar sala
        </button>
        <button v-else type="button" class="w-full inline-flex items-center px-4 py-2 border border-transparent
          text-base leading-6 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-500
          focus:outline-none focus:border-yellow-700 focus:shadow-outline-yellow active:bg-yellow-700
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
import { useRouter } from "vue-router";
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core';

export default {
  name: "UpdateRoom",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(false);
    let roomData = ref({
      name: "",
      description: "",
    });

    computed(() => {
      return roomData.name || roomData.description;
    });

    /* Init */
    async function getRoom() {
      try {
        let room = store.getters["rooms/getRoom"](props.id)
        if(!room) {
          room = await store.dispatch("rooms/getRoom", props.id);
          if(!room.exists) throw new Error("No se pudo encontrar esas sala")
          room = room.data()
        }
        roomData = room
      } catch (error) {
        console.error(error.message)
      }
    }

    getRoom()

    async function updateRoom() {
      isLoading.value = true

      try {
        await store.dispatch("rooms/updateRoom", {
          roomId: props.id,
          name: roomData.name,
          description: roomData.description,
        })
        router.push({ name: "Home" })
      } catch (error) {
        console.error(error.message)
      } finally {
        isLoading.value = false
      }
    }

    return {isLoading, roomData, updateRoom}
  }
}
</script>

<style>

</style>
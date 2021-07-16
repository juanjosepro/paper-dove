<template>
  <div  class="grid grid-cols-4 gap-4">
    <!-- <h1 v-if="!rooms.length">cargando...</h1> -->
    <div v-for="(room, i) in rooms" :key="i"  class="col-span-1 max-w-sm rounded overflow-hidden shadow-2xl">
      <img class="w-full" src="https://bulma.io/images/placeholders/1280x960.png" alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ room.name }}</div>
        <div class="font-light text-lg mb-2">Creado por {{ room.adminName }}</div>
        <p class="text-gray-700 text-base">
          {{ room.description }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <router-link 
          v-if="room.adminUid === userAuthenticatedUid"
          :to="{ name: 'UpdateRoom', params: {id: room.id} }"
         class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Editar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from '@vue/reactivity'

export default {
  name: "RoomListComponent",
  props: {
    rooms: {
      type: Array,
      required: true,
    }
  },
  setup() {
    const store = useStore();
    const userAuthenticatedUid = ref(store.getters['user/getUserUid']);
    const isLoading = ref(store.state.isLoading)
    
    return { userAuthenticatedUid, isLoading }
  }

}
</script>

<style>

</style>
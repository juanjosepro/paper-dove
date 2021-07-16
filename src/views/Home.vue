<template>
  <div class="home">
    <RoomList :rooms="rooms"/>
  </div>
</template>

<script>
import { useStore } from "vuex";

import RoomList from '../components/RoomList.vue';
import { computed } from '@vue/runtime-core';

export default {
  name: 'Home',
  components: {
    RoomList,
  },
  setup() {
    const store = useStore();

    const rooms = computed(() => store.state.rooms.rooms)
    
    return { rooms }
  }
}
</script>

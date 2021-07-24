<template>
  <p v-if="isLoading">loading</p>
  <RoomList v-else :unread-messages="unReadMessages" :rooms="roomsByDate"  class="relative top-20"/>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

/* Components */
import RoomList from '../components/RoomList.vue';

export default {
  name: 'Home',
  components: {
    RoomList,
  },
  setup() {
    const store = useStore();

    const isLoading = computed(() => store.state.isLoading);
    const messages = computed(() => store.state.messages.messages);
    const meta = computed(() => store.state.user.meta);
    const roomsByDate = computed(() => store.getters['rooms/roomsByDate']);

    function existJoined(message) {
      if (meta.value.joined) {
        // eslint-disable-next-line
        meta.value.joined[message.roomId]
        && meta.value.joined[message.roomId] < message.createdAt;
      }
    }

    const unReadMessages = computed(() => messages.value.filter(existJoined));

    return {
      /* computed */
      isLoading,
      roomsByDate,
      unReadMessages,
    };
  },
};
</script>

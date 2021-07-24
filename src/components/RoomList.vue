<template>
  <div class="grid grid-cols- gap-4 sm:grid-cols-2 md:grid-cols-4">
    <div
      v-for="(room, i) in rooms"
      :key="i"
      class="max-w-sm rounded shadow-2xl mx-auto relative w-full overflow-hidden"
      :class="{ 'border-2 border-green-400 unread' : hasUnReadMessages(room.id).length }"
    >
      <div class="room overflow-hidden rounded">
        <div
          v-if="hasUnReadMessages(room.id).length"
          class="rounded-full bg-green-500 border-gray-400 border-2
          text-white px-1 absolute -top-1.5 -right-1.5 font-bold"
          style="font-size:8px">
          {{ hasUnReadMessages(room.id).length }}
        </div>
        <img
          class="w-full h-44 object-cover rounded"
          :src="getRoomImage(room.id)"
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ room.name }}</div>
          <div class="font-bold text-xs mb-2">
            Creado por {{ room.adminName }}
          </div>
          <p class="text-gray-700 text-xs">
            {{ room.description }}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2 flex justify-between">
          <router-link
            v-if="room.adminUid === $store.getters['user/getUserUid']"
            :to="{ name: 'UpdateRoom', params: { id: room.id } }"
            class="
              inline-block
              bg-gray-200
              rounded-full
              px-3
              py-1
              text-sm
              font-semibold
              text-gray-700
              mr-2
              mb-2
            "
          >
            Editar
          </router-link>
          <router-link
            :to="{ name: 'Chat', params: { id: room.id } }"
            class="
              inline-block
              bg-gray-200
              rounded-full
              px-3
              py-1
              text-sm
              font-semibold
              text-gray-700
              mr-2
              mb-2
            "
          >
            Ir al Chat
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomListComponent',
  props: {
    rooms: {
      type: Array,
      required: true,
    },
    unreadMessages: {
      type: Array,
    },
  },
  setup(props) {
    function getRoomImage(roomId) {
      // eslint-disable-next-line
      const room = props.rooms.find((room) => room.id === roomId);
      // eslint-disable-next-line
      return room.image ? room.image : require('@/assets/img/room-image-default.png')
    }

    function hasUnReadMessages(roomId) {
      return props.unreadMessages.filter(
        (message) => message.roomId === roomId,
      );
    }

    return {
      getRoomImage,
      hasUnReadMessages,
    };
  },
};
</script>

<style lang="scss">
.unread {
  animation: slidein 0.6s infinite alternate ease-in-out;
}
@keyframes slidein {
  from {
    transform: translateY(-5px);
  }
  to {
    transform: translateY(5px);
  }
}
</style>

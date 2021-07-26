<template>
  <div class="p:2 sm:p-6 justify-between flex flex-col relative top-14 box-border">
    <!-- Body CHAT -->
    <div
      v-if="roomData"
      class="
        flex flex-col
        space-y-4
        p-3
        overflow-y-auto
        scrollbar-thumb-blue
        scrollbar-thumb-rounded
        scrollbar-track-blue-lighter
        scrollbar-w-2
        scrolling-touch
        mb-14
      "
    >
      <template v-for="message in roomMessages" :key="message.id">
        <messages :message="message" @delete-message="deleteMessage"/>
      </template>
    </div>

    <!-- Input FORM  CHAT-->
    <div class="bg-gray-300 pt-1 pb-1 px-2 mb-0
      bottom-0 fixed w-full self-center box-border">
      <control-chat :is-loading="isLoading" @create-message="createMessage"/>
    </div>
    <span ref="containerMessages"></span>
  </div>
</template>

<script>
import {
  ref, computed, nextTick, onUnmounted, watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

/* Components */
import Messages from '@/components/MessageComponent.vue';
import ControlChat from '@/components/ControlChatComponent.vue';

export default {
  name: 'ChatComponent',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Messages,
    ControlChat,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const isLoading = ref(false);
    const photoURL = ref(null);
    const audioURL = ref(null);
    const userAuth = ref(store.state.user.user);
    const userUid = ref(store.state.user.user.uid);
    const roomData = ref(null);

    /* $ref */
    const containerMessages = ref(null);
    const roomMessages = computed(() => store.getters['messages/getMessages'](props.id));

    watch(
      roomMessages,
      () => {
        nextTick(() => {
          containerMessages.value = containerMessages.value.scrollIntoView({ behavior: 'smooth' });
        });
      },
      { deep: true },
    );

    async function getRoom() {
      isLoading.value = true;
      try {
        roomData.value = await store.dispatch('rooms/getRoom', props.id);
        store.dispatch('user/updateMeta', {
          roomID: props.id,
          exit: false,
          uid: userUid.value,
        });
      } catch (error) {
        console.error(error.message);
        router.push({ name: 'Home' });
      } finally {
        isLoading.value = false;
      }
    }

    getRoom();

    async function createMessage({ message, photo, audio }) {
      isLoading.value = true;

      try {
        if (photo) {
          photoURL.value = await store.dispatch('messages/uploadMessageFile', {
            roomID: props.id,
            file: photo,
            type: 'photo',
          });
        }

        if (audio) {
          audioURL.value = await store.dispatch('messages/uploadMessageFile', {
            roomID: props.id,
            file: audio,
            type: 'audio',
          });
        }

        await store.dispatch('messages/createMessage', {
          roomID: props.id,
          message,
          photo: photoURL.value,
          audio: audioURL.value,
        });

        photoURL.value = '';
        audioURL.value = '';
      } catch (error) {
        console.error(error.message);
      } finally {
        isLoading.value = false;
      }
    }

    async function deleteMessage(messageID) {
      try {
        // eslint-disable-next-line
        if (window.confirm('¿Desea eliminar el mensaje?')) {
          // eslint-disable-next-line
          const message = roomMessages.value.find((message) => message.id === messageID);

          if (message.photo) {
            await store.dispatch('messages/deleteFile', message.photo);
          }

          if (message.audio) {
            await store.dispatch('messages/deleteFile', message.audio);
          }

          await store.dispatch('messages/deleteMessage', {
            roomID: props.id,
            messageID,
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    onUnmounted(() => {
      store.dispatch('user/updateMeta', {
        roomID: props.id,
        exit: true,
        uid: userUid.value,
      });
    });

    return {
      /* data */
      isLoading,
      roomData,
      userAuth,

      /* $refs */
      containerMessages,

      /* computed */
      roomMessages,

      /* methods */
      createMessage,
      deleteMessage,
    };
  },
};
</script>

<style lang="scss">
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}

.photo-preview:hover {
  cursor: pointer;

  &:before {
    content: 'x';
    width: 100%;
    height: 100%;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.521);
    color: #fff;
  }
}
</style>

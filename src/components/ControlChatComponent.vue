<template>
  <form @submit.prevent="createMessage">
    <div class="relative flex justify-between">
      <span class="absolute inset-y-0 flex items-center">
        <button
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-full
            h-10
            w-10
            transition
            duration-500
            ease-in-out
            text-gray-500
            hover:bg-gray-300
            focus:outline-none
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9
                9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button>
      </span>
      <input
        v-model="message"
        type="text"
        placeholder="Escriba un mensaje..."
        class="
          w-full
          focus:outline-none
          focus:placeholder-gray-400
          text-gray-600
          placeholder-gray-600
          pl-12
          pr-4
          bg-gray-200
          rounded-full
          py-3
        "
      />
      <div class="relative right-0 items-center inset-y-0 flex">
        <div
          class="absolute bottom-14 flex right-16 p-1 items-center bg-gray-700 rounded"
          v-if="audio"
        >
          <audio :src="messageAudio" controls class="w-52 h-10"></audio>
          <a href="#" @click="audio = null" class="mx-2 font-bold text-white">x</a>
        </div>
        <div
          v-if="photo"
          @click="photo = null"
          class="photo-preview h-10 w-10 bg-center bg-cover bg-no-repeat
          rounded-lg border-gray-500 border-2"
          :style="{ 'background-image': `url(${messagePhoto})` }"
        >
        </div>
        <button
          v-if="!recorder"
          @click="recordAudio()"
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-full
            h-12
            w-12
            mr-2
            transition
            duration-500
            ease-in-out
            text-gray-500
            hover:bg-gray-300
            focus:outline-none
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8
              a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </button>
        <button
          v-else
          @click="stop()"
          type="button"
          class="
            inline-flex
            items-center
            justify-center
            rounded-full
            h-12
            w-12
            mr-2
            transition
            duration-500
            ease-in-out
            text-white
            bg-gray-700
            focus:outline-none
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8
              a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          @click="$refs.file.click()"
          :disabled="isLoading"
          class="
            inline-flex
            items-center
            justify-center
            rounded-full
            h-10
            w-10
            mr-2
            transition
            duration-500
            ease-in-out
            text-gray-500
            hover:bg-gray-300
            focus:outline-none
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4
                0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
          <input
            @change="onFileChange"
            type="file"
            ref="file"
            style="display: none !important"
          />
        </button>
        <button
          type="submit"
          class="
            inline-flex
            items-center
            justify-center
            rounded-full
            h-12
            w-12
            transition
            duration-500
            ease-in-out
            text-white
            bg-indigo-700
            hover:bg-indigo-600
            focus:outline-none
          "
          :disabled="isLoading"
        >
          <svg
            v-if="!isLoading"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-6 w-6 transform rotate-90"
          >
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169
              1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1
              1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
            ></path>
          </svg>
          <svg
            v-else
            class="animate-spin h-5 w-5"
            viewBox="0 0 24 24">
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
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'ControlChatComponent',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const message = ref('');
    const photo = ref(null);
    const audio = ref(null);
    const recorder = ref(null);

    /* $refs */
    const file = ref(null);

    const messagePhoto = computed(() => URL.createObjectURL(photo.value));
    const messageAudio = computed(() => URL.createObjectURL(audio.value));

    function onFileChange(event) {
      // eslint-disable-next-line
      photo.value = event.target.files[0];
      file.value = null;
    }

    async function recordAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        const options = { mimeType: 'audio/webm' };
        const recordedChunks = [];

        recorder.value = new MediaRecorder(stream, options);
        recorder.value.addEventListener('dataavailable', (e) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        });

        recorder.value.addEventListener('stop', () => {
          audio.value = new Blob(recordedChunks);
        });

        recorder.value.start();
      } catch (error) {
        console.error(error.message);
      }
    }

    function stop() {
      recorder.value.stop();
      recorder.value = null;
    }

    function createMessage() {
      if (message.value || photo.value || audio.value) {
        emit('create-message', {
          message: message.value,
          photo: photo.value,
          audio: audio.value,
        });

        message.value = '';
        photo.value = '';
        audio.value = '';
      }
    }

    return {
      /* data */
      message,
      audio,
      photo,
      recorder,

      /* computed */
      messagePhoto,
      messageAudio,

      /* methods */
      onFileChange,
      recordAudio,
      createMessage,
      stop,
    };
  },
};
</script>

<style>

</style>

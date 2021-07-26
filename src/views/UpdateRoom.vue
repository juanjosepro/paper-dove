<template>
  <div class="w-full mx-auto max-w-xs relative top-14">
    <h1 v-if="isLoading">cargando...</h1>
    <form
      v-else
      @submit.prevent="updateRoom"
      class="bg-white shadow-2xl rounded px-8 pt-6 mb-4"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="name">
          Nombre de la sala
        </label>
        <input
          v-model="roomData.name"
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
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          for="description"
        >
          Descripcion de la sala
        </label>
        <textarea
          v-model="roomData.description"
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
          id="descripción"
          type="text"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-semibold mb-2"
          for="description"
        >
          Imagen de la sala
        </label>
        <div
          class="relative h-40 w-full bg-cover bg-center"
          :style="{'background-image': `url(${roomImage})`}">
          <a v-if="image" href="#" @click.prevent="changeImageDefault"
          class="absolute right-0 py-1 px-3 m-1 bg-gray-800 text-red-700 font-bold">
            X
          </a>
        </div>
        <div class="overflow-hidden relative w-64 mt-4 mb-4">
          <button
            @click="$refs.file.click()"
            type="button"
            class="bg-gray-400 rounded hover:bg-gray-700 text-white
            py-1 px-4 w-full inline-flex items-center">
              <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
              </svg>
              <span class="ml-2">Cambiar imagen...</span>
          </button>
          <input
            @change="onFileChange"
            ref="file"
            class="cursor-pointer absolute block opacity-0 pin-r pin-t"
            type="file"
            name="vacancyImageFiles"
          >
        </div>
      </div>
      <div class="flex items-center justify-center">
        <button
          v-if="!isLoading"
          class="
            w-full
            uppercase
            bg-yellow-600
            hover:bg-yellow-700
            text-white
            text-xs
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none
            focus:shadow-outline
          "
          type="submit"
        >
          Actualizar sala
        </button>
        <button
          v-else
          type="button"
          class="
            w-full
            inline-flex
            items-center
            px-4
            py-2
            border border-transparent
            text-base
            leading-6
            font-medium
            rounded-md
            text-white
            bg-yellow-600
            hover:bg-yellow-500
            focus:outline-none
            focus:border-yellow-700
            focus:shadow-outline-yellow
            active:bg-yellow-700
            transition
            ease-in-out
            duration-150
            cursor-not-allowed
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
        href="#"
        @click="removeRoom"
        class="
          flex
          justify-center
          w-full
          hover:text-gray-900
          text-gray-600
          text-xs
          pt-4
        "
      >
        Eliminar sala
      </a>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2021 Juan José Pau. Todos los derechos reservados.
    </p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'UpdateRoom',
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
    const image = ref(null);
    const imageURL = ref(null);
    const roomData = ref(null);

    /* $refs */
    const file = ref(null);

    computed(() => roomData.value.name || roomData.value.description);
    const roomImage = computed(() => (imageURL.value
      ? imageURL.value
      // eslint-disable-next-line
      : require('@/assets/img/room-image-default.png')));

    async function getRoom() {
      isLoading.value = true;

      try {
        roomData.value = await store.dispatch('rooms/getRoom', props.id);
        imageURL.value = roomData.value.image;
      } catch (error) {
        console.error(error.message);
      } finally {
        isLoading.value = false;
      }
    }

    getRoom();

    function theFieldsAreEmpty() {
      if (roomData.value.name <= 3) {
        // eslint-disable-next-line
        alert('Es necesario que llene todos los campos');
        return false;
      }
      return true;
    }

    async function updateRoom() {
      if (theFieldsAreEmpty()) {
        isLoading.value = true;

        try {
          if (image.value) {
            imageURL.value = await store.dispatch('rooms/uploadRoomImage', {
              roomID: props.id,
              file: image.value,
            });
          }

          await store.dispatch('rooms/updateRoom', {
            roomId: props.id,
            name: roomData.value.name,
            description: roomData.value.description,
            image: imageURL.value,
          });
          router.push({ name: 'Home' });
        } catch (error) {
          console.error(error.message);
        } finally {
          isLoading.value = false;
        }
      }
    }

    async function removeRoom() {
      try {
        // eslint-disable-next-line
        if (window.confirm('¿Desea eliminar esta sala?, al eliminar la sala tambien se eliminaran las conversaciones')) {
          await store.dispatch('rooms/removeRoom', props.id);
          router.push({ name: 'Home' });
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    function onFileChange(event) {
      // eslint-disable-next-line
      image.value = event.target.files[0];
      imageURL.value = URL.createObjectURL(image.value);
      file.value = null;
    }

    function changeImageDefault() {
      imageURL.value = roomData.value.image;
      image.value = null;
    }

    return {
      /* data */
      isLoading,
      roomData,
      image,

      /* computed */
      roomImage,

      /* methods */
      updateRoom,
      removeRoom,
      onFileChange,
      changeImageDefault,
    };
  },
};
</script>

<style>
</style>

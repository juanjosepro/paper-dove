<template>
  <div
    v-if="message.userId === $store.getters['user/getUserUid']"
    class="chat-message w-94"
  >
    <div class="flex items-end justify-end">
      <div
        class="
          flex flex-col
          space-y-2
          text-xs
          mx-2
          order-1
          items-end
          max-w-96
        "
      >
          <div v-if="message.audio">
            <audio class="w-52 h-10" :src="message.audio" controls></audio>
          </div>
          <div
            v-if="message.photo"
            class="w-52 h-52 bg-cover rounded-md border-gray-500 border-2 mt-2 self-end"
            :style="{ 'background-image': `url(${message.photo})` }">
          </div>
          <div
            v-if="message.message"
            class="
              mt-2
              px-4
              py-2
              rounded-lg
              rounded-br-none
              bg-blue-500
              text-white
              text-sm
              sm:w-3/4
              md:w-3/4
              lg:w-3/4"
          >
          {{message.message}}
          </div>
          <div class="flex justify-end">
            <small>
              <i class="pr-1">
                enviado hace {{ timeAgo(message.createdAt) }}
              </i>
            </small>
            <a
              href="#"
              v-if="message.userId === $store.getters['user/getUserUid']"
              @click="$emit('delete-message', message.id)"
              class="text-black text-xs rounded-sm font-bold"
              >x</a>
          </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?
        ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;f
        it=facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        class="w-6 h-6 rounded-full order-2"
      />
    </div>
  </div>
  <div v-else class="chat-message">
    <div class="flex items-end">
      <div
        class="
          flex flex-col
          space-y-2
          text-xs
          mx-2
          order-2
          items-start
          max-w-96
        "
      >
        <div v-if="message.audio" class="w-52 h-10">
          <audio class="w-full h-full" :src="message.audio" controls></audio>
        </div>
        <div
          v-if="message.photo"
          class="w-52 h-52 bg-cover rounded-md border-gray-500 boprder-2 mt-2"
          :style="{ 'background-image': `url(${message.photo})` }">
        </div>
        <span
          v-if="message.message"
          class="
            mt-2
            px-4
            py-2
            rounded-lg
            inline-block
            rounded-bl-none
            bg-gray-300
            text-gray-600
            text-sm
            sm:w-3/4
            md:w-3/4
            lg:w-3/4"
        >
          {{ message.message }}
        </span>
        <small>
          <i class="pl-1">
            {{ message.userName }} - enviado hace
            {{ timeAgo(message.createdAt) }}
          </i>
        </small>
      </div>
      <img
        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixl
        ib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=
        facearea&amp;facepad=3&amp;w=144&amp;h=144"
        alt="My profile"
        class="w-6 h-6 rounded-full order-1"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import es from 'dayjs/locale/es';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

dayjs.locale('es');

export default {
  name: 'MessageComponent',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup() {
    function timeAgo(timestamp) {
      const date = new Date(timestamp);
      return dayjs().from(dayjs(date), true);
    }

    return { timeAgo };
  },
};
</script>

<style>

</style>

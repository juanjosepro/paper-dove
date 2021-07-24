<template>
  <nav-bar />
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  setup() {

  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

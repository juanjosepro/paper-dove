<template>
  <nav-bar />
  <div class="max-w-7xl mx-auto px-2 py-10 sm:px-6 lg:px-8">
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  setup() {
    
  },
  components: {
    NavBar,
  }
}
</script>


<style lang="scss">
</style>

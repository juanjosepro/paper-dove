<template>
  <nav class="bg-indigo-700 fixed w-full z-50 box-border">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <!-- Is autenticated -->
      <template v-if="isAutenticated">
        <div class="relative flex items-center justify-between h-16">
          <div
            class="
              flex-1 flex
              items-center
              justify-start
              sm:items-stretch
              sm:justify-start
            "
          >
            <div class="ml-3 relative">
              <div class="flex items-center">
                <button
                  @click="openSettings = !openSettings; openMenu = false"
                  type="button"
                  class="
                    bg-gray-800
                    flex
                    text-sm
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-gray-800
                    focus:ring-white
                  "
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full object-center object-cover"
                    src="@/assets/img/profile-default2.jpg"
                    alt=""
                  />
                </button>
                <a class="text-white px-3 py-2 text-sm capitalize">{{
                  $store.state.user.user.displayName
                }}</a>
                <div class="bg-green-500 rounded-full w-2 h-2 relative right-1"></div>
              </div>
              <div
                v-if="openSettings"
                class="
                  origin-top-left
                  absolute
                  left-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                  z-10
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <router-link
                  @click="openSettings = false"
                  :to="{ name: 'UserProfile' }"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                  >Mi perfil</router-link
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                  >Configuración</a
                >
                <a
                  @click="doLogout"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                  >Cerrar sesión</a
                >
              </div>
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <router-link
                  :to="{ name: 'Home' }"
                  class="
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-gray-300
                    hover:text-white
                  "
                  aria-current="page"
                  >Inicio</router-link
                >
                <router-link
                  :to="{ name: 'CreateRoom' }"
                  class="
                    text-gray-300
                    hover:text-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                  "
                  >Crear nueva sala</router-link
                >
              </div>
            </div>
          </div>
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              sm:static
              sm:inset-auto
              sm:ml-6
              sm:pr-0
              mr-10
              sm:mr-0
            "
          >
            <!-- Notifications -->
            <button
              class="
                p-1
                rounded-full
                text-gray-300
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray-800
                focus:ring-white
              "
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002
                  0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0
                  .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>

          <!-- Mobile menu button-->
          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              @click="openMenu = !openMenu; openSettings = false"

              type="button"
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-300
                hover:text-white
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-white
              "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </template>

      <!-- No autenticated -->
      <template v-else>
        <div class="relative flex items-center justify-between h-16">
          <div
            class="
              flex-1 flex
              items-center
              justify-start
              sm:items-stretch
              sm:justify-start
            "
          >
            <div class="flex-shrink-0 flex items-center">
              <img
                class="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <span class="text-white ml-2 font-bold">
                VUE CHAT
              </span>
            </div>
          </div>
          <div
            class="
              hidden
              absolute
              inset-y-0
              right-0
              sm:flex
              items-center
              pr-2
              sm:static
              sm:inset-auto
              sm:ml-6
              sm:pr-0
            "
          >
            <router-link
              :to="{ name: 'Login' }"
              @click="openMenu = false"
              class="
                bg-transparent
                text-gray-300
                hover:text-white
                font-semibold
                text-sm
                py-1
                px-3
                mr-2
                rounded
                cursor-pointer
              "
              >Login</router-link
            >
            <router-link
              :to="{ name: 'Register' }"
              @click="openMenu = false"
              class="
                bg-transparent
                text-gray-300
                hover:text-white
                font-semibold
                py-1
                px-3
                text-sm
                mr-2
                hover:border-transparent
                rounded
                cursor-pointer
              "
            >
              Registrarme
            </router-link>
            <router-link
              @click="openSettings = false"
              :to="{ name: 'ResetPassword' }"
              class="
                bg-transparent
                text-gray-300
                hover:text-white
                font-semibold
                py-1
                text-sm
                px-3
                hover:border-transparent
                rounded
                cursor-pointer
              "
              >Olvidé mi contraseña</router-link
            >
          </div>

          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              @click="openMenu = !openMenu"
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-white
              "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="openMenu" class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 flex flex-col">
        <template v-if="isAutenticated">
          <router-link
            :to="{ name: 'Home' }"
            @click="openMenu = false"
            class="
              text-white
              px-3
              py-2
              rounded-md
              text-sm
              font-medium
            "
            aria-current="page"
            >Inicio</router-link
          >
          <router-link
            :to="{ name: 'CreateRoom' }"
            @click="openMenu = false"
            class="
              text-gray-300
              hover:bg-gray-700
              hover:text-white
              px-3
              py-2
              rounded-md
              text-sm
              font-medium
            "
            >Crear nueva sala</router-link
          >
          <a
            @click="doLogout()"
            href="#"
            class="block px-3 py-2 text-sm text-gray-300"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-2"
            >Cerrar sesión</a
          >
        </template>
        <template v-else>
          <router-link
            @click="openMenu = false"
            :to="{ name: 'Login' }"
            class="
              text-gray-300
              px-3
              py-2
              rounded-md
              text-sm
              font-medium
            "
            aria-current="page"
            >Login</router-link
          >
          <router-link
            @click="openMenu = false"
            :to="{ name: 'Register' }"
            class="
              text-gray-300
              hover:bg-gray-700
              hover:text-white
              px-3
              py-2
              rounded-md
              text-sm
              font-medium
            "
            >Registrarme</router-link
          >
          <router-link
            @click="openMenu = false"
            :to="{ name: 'ResetPassword' }"
            class="block px-3 py-2 text-sm text-gray-300
              hover:text-white"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-0"
            >Restabler contraseña</router-link
          >
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const router = useRouter();
    const openMenu = ref(false);
    const openSettings = ref(false);
    const isLoading = computed(() => store.state.isLoading);
    const isAutenticated = computed(() => store.state.user.user);

    async function doLogout() {
      openSettings.value = false;
      openMenu.value = false;
      try {
        await store.dispatch('user/doLogout');
        router.push({ name: 'Login' });
      } catch (error) {
        console.error(error.message);
      }
    }

    return {
      isLoading,
      isAutenticated,
      openMenu,
      openSettings,
      doLogout,
    };
  },
};
</script>

<style>
</style>

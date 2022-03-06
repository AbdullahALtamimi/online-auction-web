<template>
  <div>
    <!-- navbar goes here -->
    <nav class="bg-gray-100">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex space-x-4">
            <!-- logo -->
            <div>
              <a
                href="#"
                class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <svg
                  class="h-6 w-6 mr-1 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <router-link to="/"
                  ><span class="font-bold">OAS</span></router-link
                >
              </a>
            </div>

            <!-- primary nav -->
            <div v-if="user" class="hidden md:flex items-center space-x-1">
              <a
                href="login"
                class="py-5 px-3 text-gray-700 hover:text-gray-900"
                >Acount</a
              >
              <a
                href="register"
                class="py-5 px-3 text-gray-700 hover:text-gray-900"
                >Add item</a
              >
            </div>
            <div v-if="!user"></div>
          </div>

          <!-- secondary nav -->
          <div v-if="!user" class="hidden md:flex items-center space-x-1">
            <router-link to="/login" class="py-5 px-3">Login</router-link>
            <router-link
              to="/register"
              class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
              >Signup</router-link
            >
          </div>
          <div v-if="user" class="hidden md:flex items-center space-x-1">
            <a
              href="javascript:void(0)"
              @click="handleclick()"
              class="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
              >Logout</a
            >
          </div>

          <!-- mobile button goes here -->
          <div class="md:hidden flex items-center">
            <button class="mobile-menu-button">
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- mobile menu -->
      <div class="mobile-menu hidden md:hidden">
        <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200"
          >Features</a
        >
        <a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200"
          >Pricing</a
        >
      </div>
    </nav>

    <!-- content goes here -->
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "nav",
  props: ["user"],
  methods: {
    handleclick() {
      window.localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

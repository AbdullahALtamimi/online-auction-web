<template lang="">
  <form @submit.prevent="handlelogin()" class="bg-green-500 x-screen y-screen">
    <nav class="h-screen flex justify-center items-center">
      <div
        class="h-3/4 w-96 bg-white flex items-center rounded-xl flex-col shading"
      >
        <h1 class="lg:text-red-500 sm:text-blue-500 text-3xl font-bold pt-12">
          LOGIN
        </h1>
        <div class="ml-4 flex flex-row text-base justify-center space-x-4 mt-7">
          <a target="_blank" href="https://www.google.com/">
            <i class="fab fa-google border-2 border-black p-1 rounded-full"></i
          ></a>
          <a href="#">
            <i
              class="fab fa-facebook-f border-2 border-black rounded-full px-1.5 py-1"
            ></i
          ></a>
          <a href="#">
            <i class="fab fa-twitter border-2 border-black p-1 rounded-full"></i
          ></a>
          <a href="#">
            <i
              class="fab fa-pinterest-p border-2 border-black p-1 rounded-full px-1.5"
            ></i
          ></a>
        </div>
        <span class="mt-6">Or use your email for registration</span>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="outline-none px-4 bg-gray-200 mt-3 border-2 lg:border-red-500 sm:border-blue-500 rounded-md h-10 w-80"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="outline-none px-4 bg-gray-200 mt-3 border-2 lg:border-red-500 sm:border-blue-500 rounded-md h-10 w-80"
        />
        <div class="mt-5 flex-row">
          <input
            type="checkbox"
            class="mt-5 h-3 bg-red-300 flex-1 border-none"
          />
          <span class="ml-2"
            >I agree to the
            <span class="lg:text-red-500 sm:text-blue-500">Terms</span> and
            <span class="lg:text-red-500 sm:text-blue-500"
              >Privacy policy</span
            ></span
          >
        </div>
        <div class="flex-row mt-10">
          <button
            class="hover bg-white border-2 lg:border-red-500 sm:border-blue-500 w-36 h-10 rounded-md lg:text-red-500 sm:text-blue-500 transition-all duration-700 ease-out"
          >
            Sign Up
          </button>
          <input type="submit" value="Sign in"
            class="hover bg-white lg:border-red-500 sm:border-blue-500 border-2 w-36 h-10 rounded-md lg:text-red-500 sm:text-blue-500"
          >
   
        </div>
      </div>
    </nav>
  </form>
</template>
<script>
import axios from 'axios'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
   async handlelogin(){
    
   const response =  await axios.post("https://online-auction0.herokuapp.com/v1/authentication/login",
     {
       email:this.email,
       password:this.password,
     })
        localStorage.setItem('token', response.data.token)
    },
  },
};
</script>
<style lang=""></style>

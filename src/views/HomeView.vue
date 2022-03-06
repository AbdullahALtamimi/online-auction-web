<template>
  <div class="home">
     <h1 v-if="user" class="text-4xl text-center mt-52 ">Hello {{user.userName}}</h1>
     <h1 v-if="!user" class="text-4xl text-center mt-52 ">You are not logged in </h1>
  </div>
</template>

<script>
// @ is an alias to /src

// eslint-disable-next-line no-unused-vars
import login from "@/components/login.vue";
export default {
  name: 'HomeView',
  props:['user']
 
}


</script>

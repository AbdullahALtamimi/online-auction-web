<template>
  <nav>
     <navbar :user="user"/>
  </nav>
  <transition
  mode="out-in"
  enter-active-class="animate__animated animate__fadeIn"
  leave-active-class="animate__animated animate__fadeOut"
  >
  <router-view :data="data" :user="user"/>
  </transition>
</template>

<style>

</style>
<script>
   import navbar from './components/navbar.vue'
   import axios from 'axios'
   
   export default {
  name: "App",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    navbar,
  },
   data(){
    return{
      user:null,
      data:"",
    }
  },
 
   async created(){
    
    const response = await axios.get("https://online-auction0.herokuapp.com/v1/authenication/user",
   { 
     headers: { 
       Authorization:'bearer ' + window.localStorage.getItem('token') 
       } 
       })
       this.user = response.data;   
  },
  
};
</script>
<template>
  <nav>
     <navbar :user="user"/>
  </nav>
  <router-view :data="data" :user="user"/>
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
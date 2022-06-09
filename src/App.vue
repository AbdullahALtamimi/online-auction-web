<template>
<div class="realw">
    <navbar/>
    <section class="home ">
        <transition
  mode="out-in"
  enter-active-class="animate__animated animate__fadeIn"
  leave-active-class="animate__animated animate__fadeOut"
  >
  <router-view :data="data" :user="user"/>
  </transition>
    </section>
</div>

  
</template>

<style>

</style>
<script>
   import navbar from '@/views/navView.vue'
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
      auc:"",
      search:"",
   
    }
  },
 
   async created(){
   try{
        const response = await axios.get("https://online-auction0.herokuapp.com/v1/authenication/user",
   { 
     headers: { 
       Authorization:'bearer ' + window.localStorage.getItem('token') 
       } 
       })
       this.user = response.data;    
       console.log(this.$route.fullPath)
    // eslint-disable-next-line no-empty
        if(this.$route.fullPath == "/"){
          this.$router.push("/page/1")
        }
   }catch(e){
      e;
   }
   
  },
   mounted(){
     this.sidebar()
  },
  methods:{
     handleclick() {
      this.$router.push("/page/1");
      window.localStorage.removeItem("token");
      window.location.reload();
    },
    submit(){
      
    this.$router.replace({
        name: "search",
        params: { searchkey: this.search },
      });    
      
  },
     sidebar(){
      const body = document.querySelector(".body"),
      sidebar = body.querySelector(".nav"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box");


      toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    searchBtn.addEventListener("click", () => {
      sidebar.classList.remove("close");
    });

    
     },
  },
  
};
</script>
<style lang="scss">






</style>
<template lang="">
    <div>
        
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "search-bar",
  
  components: {
    // eslint-disable-next-line vue/no-unused-components
    
  },
    data(){
        return{
            search:"",
        }
    },
   async created(){
         await axios.get(
        `https://online-auction0.herokuapp.com/v1/auctions?PageNumber=${this.currentPage}&PageSize=${12}&Search=${this.search}`,
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        }
      );
    }
}
</script>
<style lang="">
    
</style>
<template lang="">
    <div class="home">
    
    <div v-if="size == 0" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl -ml-24 mt-80 text-white">nothing found</div>
         <div class="" v-for="auction in auc" :key="auction.item">
        <div class="p-10 w-1/1 md:w-1/3  float-left">
          <div
            
            class="bg-gray-800 rounded-md flex flex-col overflow-hidden height cursor-pointer shadow-xl"
          >
          <div class="relative">
            <img class="w-full h-48 object-cover " :src="auction.item.photoUrl" />
            <div v-if="user">
               <button
                v-if="auction.username == user.userName"
                @click="deletitem(auction.id)"
                id="delete-btn"
                class="ml-1 absolute  bg-red-500 delay-400 bottom-1 duration-300 hover:bg-red-800 text-white py-1 px-3 rounded-full"
              >
                Delete
              </button>
              <button
              @click="claimitem(auction.id)"
              v-if="auction.hasEnded && auction.username != user.userName"
              class="p-2 absolute text-white bottom-1 bg-blue-600 rounded-full hover:bg-blue-700 border-blue-500"
            >
              Claim
            </button>
            </div>
          </div>
            <div @click="expand(auction.id)" class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                <span class="text-blue-500">name:</span>
                <span class="text-white">{{ auction.item.name }}</span>
              </div>
              <div class="font-bold text-xl mb-2">
                <span class="text-blue-500">Price:</span>
                <span class="text-white">
                  ${{ auction.currentPrice }}
                </span>
              </div>
              <div class="font-bold text-xl mb-2">
                <span class="text-blue-500">End date:</span>
                <span class="text-white">{{ converttime(auction.expireDate) }}</span>
              </div>
            </div>
            <div class="ml-1/2">
             
            </div>
            
          </div>
           </div>
      </div>
    
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "search-bar",
  props: ["user"],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    
  },
    data(){
        return{
            search:"",
            auc:null,
            size:"",
            filter:"",
        }
    },
     watch: {     
         $route(){
           window.location.reload();
         }
  },

   async created(){
     this.search = this.$route.params.searchkey
     this.filter = this.$route.params.filter
       const res =  await axios.get(
        `https://online-auction0.herokuapp.com/v1/auctions?Search=${this.search}`,
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      this.auc = res.data.data;
      this.size = this.auc.length
      console.log(this.size)
    },
    methods:{
       deletitem(itemid) {
      
     
         axios.delete(
        `https://online-auction0.herokuapp.com/v1/auction?auctionId=${itemid}`,
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        },

        {
          id: itemid,
        }
      ).then(this.timeFunction()).catch(e => this.errmessage = e.response.data.message)
     if(this.errmessage){
       const popup = document.querySelector(".hello");
       popup.style.display = "block";
     }
    },
    timeFunction() {
            setTimeout(function(){ window.location.reload(); }, 2000);
        },
     close() {
      const popup = document.querySelector(".hello");
      popup.style.display = "none";
    },
    converttime(date) {
      var dt = new Date(date);
      return dt.toString();
    },
    expand(aucid) {
      this.$router.push({
        name: "card",
        params: { id: aucid, user: this.uuser },
      });
    
    },
    changeRoute() {
      if(this.search == 0 ){
        this.$router.push("/page/1")
      }else{
        this.$router.push({
        name: "search",
        params: { searchkey: this.myaucfilter },
      }); 
      }
          
    },
    }
}
</script>
<style lang="">
    
</style>
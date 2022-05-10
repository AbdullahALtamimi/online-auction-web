<template>
  <div class="home bg-blue-400">
     <h1 v-if="!user" class="text-4xl text-center mt-52 ">You are not logged in </h1>
     <div v-if="user">
          <div  v-for="(auction) in auc" :key="auction.item.name">
      <div class=" p-10 w-1/3 float-left">
        <div @click="expand(auction.id)" class="bg-white rounded-md flex flex-col overflow-hidden height cursor-pointer shadow-xl">
          <img class="w-full h-48" :src="auction.item.photoUrl" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              <span class="text-blue-500">name:</span> {{ auction.item.name }}
            </div>
            <div class="font-bold text-xl mb-2">
             <span class="text-blue-500">Price:</span>  ${{ auction.item.startingPrice }} 
            </div>
            <div class="font-bold text-xl mb-2">
             <span class="text-blue-500">End date:</span>  {{  }}
            </div>
           
          </div>
          <div class="ml-1/2">
            
            <button
              v-if="auction.username == user.userName"
              @click="deletitem(auction.id)"
              id="delete-btn"
              class="ml-5 bg-red-500 delay-400 mb-5 w-96 duration-300 hover:bg-red-800 text-white py-1 px-4 rounded-full  "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
     </div>
     
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
// eslint-disable-next-line no-unused-vars
import login from "@/components/login.vue";

export default {
  name: 'HomeView',
  props:['user'],
  data(){
    return{
      currentid:"",
      biddingvalue:"",
      date:"",
      myaucfilter:false,
      expanditem:"",
      
    }
  },
  created(){
     axios
      .get("https://online-auction0.herokuapp.com/v1/auctions",{
        headers: {
          Authorization: "bearer " + window.localStorage.getItem("token"),
        },
        params:{
          MyAuctionsOnly:this.myaucfilter
        }
      })
      .then((res) => {this.auc = res.data.data
      console.log(this.auc[4].highestBids.value)
      });  
},
methods:{
     deletitem(itemid) {
      axios
        .delete(
          `https://online-auction0.herokuapp.com/v1/auction?auctionId=${itemid}`,
          {
            headers: {
              Authorization: "bearer " + window.localStorage.getItem("token"),
            },
          },

          {
            id: itemid,
          }
        );
        
    },
    converttime(date){
      const utcDate = date;
      this.date = new Date(utcDate);
      return this.date
    },
    expand(aucid){
       this.$router.push({name:"card", params:{data:aucid}});
      
    }
}

}
</script>
<style lang="css">
  
   .home{
     height:500vh;
   }
</style>

<template>
  <div class="home bg-blue-400">
     <h1 v-if="!user" class="text-4xl text-center mt-52 ">You are not logged in </h1>
     <div v-if="user">
          <div  v-for="(auction) in auc" :key="auction.item.name">
      <div class=" p-10 w-1/3 float-left">
        <div @click="expand(auction.id)" class="bg-white rounded-md flex flex-col overflow-hidden height cursor-pointer shadow-xl">
          <img class="w-full h-52" :src="auction.item.photoUrl" />
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
            <p class="text-gray-700 h-24 border text-base">
              {{ auction.item.description }}
            </p>
          </div>
          <div class="ml-1/2">
            <button 
            v-if="auction.username != user.userName"
              @click="bid(auction.id,auction.expireDate)"
              id="pub-btn"
              class="ml-5 mt-auto delay-400 duration-300 bg-blue-500 hover:bg-blue-800 text-white py-1 px-4 rounded-full"
            >
              bid
            </button>
            <button
              v-if="auction.username == user.userName"
              @click="deletitem(auction.id)"
              id="delete-btn"
              class="ml-5 bg-red-500 delay-400 duration-300 hover:bg-red-800 text-white py-1 px-4 rounded-full  "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
     </div>
     <div
      class="bg-black bg-opacity-50 left-1/3 top-1/2 -translate-x-1/2 fixed -translate-y-1/2 hidden hello"
      id="overlay"
    >
      <div
        class="bg-gray-200 max-w-sm py-2 px-3 rounded shadow-xl text-gray-800"
      >
        <div class="flex justify-between items-center w-80">
          <h4 class="text-lg font-bold">Confirm Delete?</h4>
          <svg
            @click="close()"
            class="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full"
            id="close-modal"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="mt-2 text-sm">
          <label name="date">Enter your bidding price:</label>
          <input
            v-model="biddingvalue"
            class="ml-3 bg-gray-200 border-2 border-blue-500 rounded-md"
            type="number"
            id="bid"
          />
        </div>
        <div class="mt-3 flex justify-end space-x-3">
          <button
            class="px-3 py-1 rounded hover:bg-red-300 hover:bg-opacity-50 hover:text-red-900"
            @click="close()"
          >
            Cancel
          </button>
          <button
            class="px-3 py-1 bg-red-800 text-gray-200 hover:bg-red-600 rounded"
            @click="bidding()"
          >
            bid
          </button>
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
import card from "@/components/expand-card.vue"
export default {
  name: 'HomeView',
  components:{
     // eslint-disable-next-line vue/no-unused-components
     card
  },
  props:['user'],
  data(){
    return{
      currentid:"",
      biddingvalue:"",
      date:"",
      myaucfilter:false,
      expanditem:"",
      no:false,
      items:"ergrgerg"
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
      });  
},
methods:{
      bid(itemid) {
      const popup = document.querySelector(".hello");
      popup.style.display = "block";
      this.currentid = itemid;
    },
    close() {
      const popup = document.querySelector(".hello");
      popup.style.display = "none";
    },
    async bidding() {
      
      await axios.post(
        "https://online-auction0.herokuapp.com/v1/bid",
        {
          value:this.biddingvalue ,
          auctionId:this.currentid,
        },
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        }
      );
    },
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
   .height{
     height:500px;
   }
   .home{
     height:500vh;
   }
</style>

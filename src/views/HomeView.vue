<template>
  <div class="home realw flex flex-col ">
  <div>
      <div class="">
      <div class=" ">
        <div class="mt-7 ml-10">
          <label class="text-xl text-white" for="filter">chose filter: </label>
          <div class="inline-block relative w-52">
            <select
              id="filter"
              v-on:change="changeRoute()"
              v-model="myaucfilter"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="0" selected>default</option>
              <option value="1">show my items</option>
              <option value="2">show my bids</option>
            </select>
            <div
            v-if="errmessage"
      class="bg-black bg-opacity-50 left-1/3 top-1/2 -translate-x-1/2 fixed -translate-y-1/2 index-100 hello"
      id="overlay"
    >
      <div
        class="bg-gray-200 max-w-sm py-2 px-3 rounded shadow-xl text-gray-800"
      >
        <div class="flex justify-between items-center w-80">
          <h4 class="text-lg font-bold">Error</h4>
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
       
        <div v-if="errmessage" class=" bg-red-700 mt-4 rounded-md">
           <p class="text-white text-center mt-2">{{errmessage}}</p>
        </div>
        
      </div>
    </div>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-for="auction in auc" :key="auction.item">
        <div class="p-10 w-1/1 md:w-1/3 float-left">
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
                  ${{ auction.item.startingPrice }}
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
  </div>
  <div class="bg-gray-700">
      <VueTailwindPagination v-if="total > 1" :current="currentPage" :total="total" :per-page="perPage" @page-changed="pagechange($event)"/>
  </div>
       
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import login from "@/components/login.vue";
   import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
export default {
  name: "Pagination-Example",
  props: ["user"],
  components:{
    VueTailwindPagination,
  },
  data() {
    return {
      currentid: "",
      biddingvalue: "",
      date: "",
      myaucfilter: 0,
      expanditem: "",
      search: "",
      auc: [],
      uuser: "",
      page:"",
      currentPage: this.$route.params.pagenum,
      perPage: 1,
      total: "",
      errmessage:"",
    };
  },

//  async updated(){
//      this.search = this.$route.params.search
     
//       if(this.myaucfilter){
//          const res = await axios.get(
//         `https://online-auction0.herokuapp.com/v1/auctions?PageNumber=${this.currentPage}&PageSize=${12}&AuctionFilterType=${this.myaucfilter}`,
//         {
//           headers: {
//             Authorization: "bearer " + window.localStorage.getItem("token"),
//           },
//           params: {
//             AuctionFilterType: this.myaucfilter,
//           },
//         }
//       );
//        this.auc = res.data.data;
//       this.uuser = this.user;
//       this.total = res.data.pageCount
//       }
//   },

  // async updated() {
  //   this.search = this.$route.params.search
    
  //   if (this.search){
  //     if (this.myaucfilter) {
  //     const res = await axios.get(
  //       `https://online-auction0.herokuapp.com/v1/auctions?AuctionFilterType=${this.myaucfilter}`,
  //       {
  //         headers: {
  //           Authorization: "bearer " + window.localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     this.auc = res.data.data;
  //   } else {
  //     const res = await axios.get(
  //       `https://online-auction0.herokuapp.com/v1/auctions?PageNumber=${this.currentPage}&PageSize=${21}&Search=${this.search}`,
  //       {
  //         headers: {
  //           Authorization: "bearer " + window.localStorage.getItem("token"),
  //         },
  //         params: {
  //           AuctionFilterType: this.myaucfilter,
  //         },
  //       }
  //     );

  //     this.auc = res.data.data;
  //     this.uuser = this.user;
  //     this.total = res.data.pageCount
  //     console.log(this.total)
  //   }
  //   }else{
    //     if (this.myaucfilter) {
    //   const res = await axios.get(
    //     `https://online-auction0.herokuapp.com/v1/auctions?AuctionFilterType=${this.myaucfilter}`,{
    //       PageSize:"1"
    //     },
    //     {
    //       headers: {
    //         Authorization: "bearer " + window.localStorage.getItem("token"),
    //       },
    //     }
    //   );

    //   this.auc = res.data.data;
    // }
    // }
    
      
  // },
  // computed: {
  //   searchfilter: function () {
  //     if (this.search) {
  //       return this.auc?.filter((sss) => {
  //         return sss.item.name.match(this.search);
  //       });
  //     } else {
  //       return this.auc;
  //     }
  //   },
  // },
  mounted(){
    
     this.paging()
  },
  methods: {
    filtering(){
      const res = axios.get(
        `https://online-auction0.herokuapp.com/v1/auctions?AuctionFilterType=${this.myaucfilter}`,{
          PageSize:"1"
        },
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      this.auc = res.data.data;
    },
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
      ).catch(e => this.errmessage = e.response.data.message)
     if(this.errmessage){
       const popup = document.querySelector(".hello");
       popup.style.display = "block";
     }
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
    async paging(){
      
           const res = await axios.get(
        `https://online-auction0.herokuapp.com/v1/auctions?PageNumber=${this.currentPage}&PageSize=${12}`,
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
          params: {
            AuctionFilterType: this.myaucfilter,
          },
        }
      );
       this.auc = res.data.data;
      this.uuser = this.user;
      this.total = res.data.pageCount
      
      
       
    },
    changeRoute() {
       this.$router.push({
        name: "filter",
        params: { filter:this.myaucfilter },
      });    
    },
    claimitem(id) {
      axios.patch(
        `https://online-auction0.herokuapp.com/v1/endAuction?auctionId=${id}`,
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        },
        {
          auctionId: id,
        }
      );
    },
    pagechange(pagenumber){
      this.currentPage = pagenumber;
      this.$router.push(`/page/${this.currentPage}`);
      this.paging()
    }
  },
};
</script>
<style lang="css">
.home {
  margin-left: -6rem;
  width: calc(100% - 8px);
  height:auto !important;

}

</style>

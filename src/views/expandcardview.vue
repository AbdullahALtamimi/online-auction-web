<template>
  <div class="home">
     <div class="w-full">
     <div class="w-3/4 float-left">
      <div style='background-color:rgba(0, 0, 0, 0)'>
        <div class="container px-5 py-24 mx-auto" style="cursor: auto;">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="item.item.photoUrl" style="cursor: auto;">
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0" style="cursor: auto;">
              <h2 class="text-sm title-font text-gray-500 tracking-widest" style="cursor: auto;">ON SALE</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1" style="cursor: auto;">{{item.name}}</h1>
              <div class="flex mb-4">
                <div>
                  <p><span class="text-blue-400 text-xl">starting price:</span>$ {{item.currentPrice}}</p>
                  <p><span class="text-blue-400 text-xl">expiration date:</span> {{item.expireDate}}</p>
                </div>
              </div>
              <p class="h-52 leading-relaxed">{{item.description}}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              
               
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">${{highestbid()}}</span>
                <button @click="bid()" class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">bid</button>
                
              </div>
            </div>
          </div>
        </div>
        </div>
     </div>
     <div class="w-1/4 h-screen border-2 border-t-0 border-b-0   float-right mt-24">
     <div v-for="bid in bids " :key="bid.vale">
         <div class="h-10 w-full mt-5 bg-blue-300">{{bid.value}} {{bids.userName}}</div>
     </div>
        
     </div>
   </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import card from '@/components/expand-card.vue'
import axios from "axios"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'cardview',
  props:['expanditem'],

    data(){
    return{
        id:"",
        item:"",
        bids:"",
    }
  },
  methods:{
    bid(){
        console.log(this.id) 
    },
    highestbid(){
        this.bids = this.item.bids

        return this.item.bids[this.bids.length-1].value
    }
  },
  created(){
    this.id = this.$route.params.data
    axios.get(
        `https://online-auction0.herokuapp.com/v1/auction?Id=${this.id}`,
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        },
        {
          id:this.id
        },
      ).then(res => {this.item = res.data
      console.log(this.item)});
  }
 

}
</script>

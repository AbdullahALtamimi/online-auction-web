<template lang="">
    <div>
        <div class="w-full">
     <div class="w-3/4 float-left">
      <div style='background-color:rgba(0, 0, 0, 0)'>
        <div class="container px-5 py-24 mx-auto" style="cursor: auto;">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://stackdiary.com/140x100.png" style="cursor: auto;">
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0" style="cursor: auto;">
              <h2 class="text-sm title-font text-gray-500 tracking-widest" style="cursor: auto;">ON SALE</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1" style="cursor: auto;">Blue Dress v2</h1>
              <div class="flex mb-4">
                <div>
                  <p><span class="text-blue-400 text-xl">starting price:</span> 500$</p>
                  <p><span class="text-blue-400 text-xl">expiration date:</span> 22-5-2022</p>
                </div>
              </div>
              <p class="leading-relaxed">Dui urna vehicula tincidunt pretium consequat luctus mi, platea fermentum conubia tempus ac orci. Pellentesque dictum malesuada cubilia faucibus dignissim mi nascetur senectus, augue ad libero efficitur dolor duis lobortis, non etiam sociosqu maximus enim mus natoque.</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              
               
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">highest bid</span>
                <button @click="bid()" class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">bid</button>
                
              </div>
            </div>
          </div>
        </div>
        </div>
     </div>
     <div class="w-1/4 h-screen border-2 border-t-0 border-b-0   float-right mt-24">
        
     </div>
   </div>
    </div>
</template>
<script>
  // import axios from "axios"
export default {
    name:"expand-card",
    props:['expanditem'],

     data(){
    return{
        id:"",
    }
  },
  methods:{
         bid(){
    
         console.log(this.id)   
      
  },
  created(){
    this.id = this.$route.params.data
    console.log(this.id) 
  }
  },
 
  
}
</script>
<style lang="">
    
</style>
<template class="home" lang="">
  <div class=" h-screen w-full ">
    <div class="font-sans antialiased h-full bg-gray-700  ">
      <!-- Content -->
      <div class="w-full" style="padding-top: 4rem">
        <div class="container mx-auto py-8">
          <div class="w-5/6 mt-12 lg:w-1/2 mx-auto bg-white rounded shadow-lg">
            <div class="py-4 px-8">
              <div class="flex mb-4">
                <div class="w-1/2 mr-1">
                  <label
                    class="block text-grey-darker text-sm font-bold mb-2"
                    for="first_name"
                    >Product Name</label
                  >
                  <input
                    class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    v-model="pname"
                    id="first_name"
                    type="text"
                    required
                  />
                </div>
                <div class="w-1/2 ml-1">
                  <label
                    class="block text-grey-darker text-sm font-bold mb-2"
                    for="last_name"
                    >Starting Price</label
                  >
                  <input
                    class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    v-model="start_price"
                    id="last_name"
                    type="number"
                    required
                  />
                </div>
              </div>
              <div class="mb-4">
                <label
                  class="block text-grey-darker text-sm font-bold mb-2"
                  for="email"
                  >chose photo</label
                >
                <div class="border w-full">
                  <input
                    class="appearance-none w-5/6 rounded py-2 px-3 text-grey-darker"
                    @change="OnFileSelected"
                    id="email"
                    type="file"
                  />
                 
                </div>
              </div>
               <div class="mb-4">
                <label
                  class="block text-grey-darker text-sm font-bold mb-2"
                  for="email"
                  >description</label
                >
                <div class="border ">
                  <textarea
                    class="appearance-none w-5/6 rounded py-2 px-3 text-grey-darker"
                    v-model="description"
                    id="email"
                    type="file"
                  textarea/>
                 
                </div>
              </div>
              <div class="flex items-center justify-between mt-8">
                <button
                  @click="senditem()"
                  class="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-full"
                  type="submit"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
            v-if="messageerr"
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
       
        <div class=" bg-red-700 mt-4 rounded-md">
           <p class="text-white text-center mt-2">{{errmessage}}{{messageerr}}</p>
        </div>
        
      </div>
    </div>
  </div>
  
</template>
<script>
import axios from "axios";

// import setAuthheader from "../utils/setAuth.js"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "additem",
  dtat() {
    return {
      pname: "",
      start_price: "",
      selectedfile: null,
      description:"",
      messageerr:"",
      errmessage:"",
    };
  },
  methods: {
    async senditem() {
      event.preventDefault();
    const result =  await axios.post(
        "https://online-auction0.herokuapp.com/v1/item",
        {
          name: this.pname,
          startingPrice: this.start_price,
          description:this.description
        },
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        }
      ).catch(e => {this.messageerr = e.response.data.message,
      console.log(this.messageerr),
      // this.errmessage = e.response.data.errors.Name,
      console.log(this.errmessage) })
      const id = result.data.id;
      
      const fd = new FormData();
      fd.append("photo", this.selectedfile);
      fd.append("ID",id);
      axios
        .post("https://online-auction0.herokuapp.com/v1/itemPhoto", fd, {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        })
        .then(this.timeFunction());
         this.$router.push("/MyItem")
     
    },
    OnFileSelected(event) {
      this.selectedfile = event.target.files[0];
    },
    timeFunction() {
            setTimeout(function(){ window.location.reload(); }, 1000);
        },
   
  },
};
</script>
<style lang="css">
  .home{
    
  }
</style>

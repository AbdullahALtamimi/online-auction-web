<template lang="">
  <div class="bg-blue-500 h-screen">
    <div class="font-sans antialiased bg-grey-lightest">
      <!-- Content -->
      <div class="w-full bg-grey-lightest" style="padding-top: 4rem">
        <div class="container mx-auto py-8">
          <div class="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow-lg">
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
                  />
                </div>
              </div>
              <div class="mb-4">
                <label
                  class="block text-grey-darker text-sm font-bold mb-2"
                  for="email"
                  >Upload file</label
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
        },
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        }
      );
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
        .then((res) => console.log(res));
    },
    OnFileSelected(event) {
      this.selectedfile = event.target.files[0];
    },
    // onupload() {
    //   event.preventDefault();
    // },
  },
};
</script>
<style lang="css"></style>

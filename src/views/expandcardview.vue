<template>
  <div class="homea bg-gray-700 -ml-40 flex">
    <div class="w-full">
      <div class="flex flex-col lg:flex-row">
        <div class="w-3/4 float-left">
          <div style="background-color: rgba(0, 0, 0, 0)">
            <div class="container px-5 py-24 mx-auto" style="cursor: auto">
              <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  class="lg:w-1/2 w-full lg:h-auto h-54 object-cover object-center rounded"
                  :src="item.item.photoUrl"
                  style="cursor: auto"
                />
                <div
                  class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                  style="cursor: auto"
                >
                  <h2
                    class="text-sm title-font text-gray-500 tracking-widest"
                    style="cursor: auto"
                  >
                    ON SALE
                  </h2>
                  <h1
                    class="text-gray-900 text-3xl title-font font-medium mb-1"
                    style="cursor: auto"
                  >
                    {{ item.name }}
                  </h1>
                  <div class="flex mb-4">
                    <div>
                      <p>
                        <span class="text-blue-400 text-xl"
                          >starting price:</span
                        >
                        <span class="text-white"
                          >${{ item.item.startingPrice }}</span
                        >
                      </p>
                      <p>
                        <span class="text-blue-400 text-xl"
                          >expiration date:</span
                        >
                        <span class="text-white">{{ item.expireDate }}</span>
                      </p>
                    </div>
                  </div>
                  <p class="h-52 leading-relaxed">
                    <span class="text-white">{{ item.item.description }}</span>
                  </p>
                  <div
                    class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"
                  ></div>
                  <div class="flex">
                    <span
                      v-if="highestbid()"
                      class="title-font font-medium text-2xl text-gray-900"
                      ><span class="text-white">${{ highestbid() }}</span></span
                    >

                    <button
                      @click="bid(item.id)"
                      class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/4 border-2 border-t-0 border-b-0 float-right mt-24">
          <div class="" v-for="bid in bids" :key="bid.vale">
            <div class="bg-white m-2 rounded-md shadow-lg">
              <div class="ml-4">
                <span class="text-blue-700 text-lg">bidder name:</span
                >{{ bid.username }}
              </div>
              <p class="ml-4">
                <span class="text-blue-700 text-lg">bidder value:</span>${{
                  bid.value
                }}
              </p>
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
          <h4 class="text-lg font-bold">Confirm bid?</h4>
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
        <div v-if="user && errmessage" class="h-10 bg-red-700 mt-4 rounded-md">
          <p  class="text-white text-center mt-2">{{ errmessage }}</p>
          
        </div>
        <div v-if="!user" class="h-10 bg-red-700 mt-4 rounded-md">
        <p  class="text-white text-center mt-2">YOU need to be logged in to make a bid</p>
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
// import card from '@/components/expand-card.vue'
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "cardview",

  data() {
    return {
      id: "",
      item: "",
      bids: "",
      currentid: "",
      user: "",
      price: "",
      errmessage: "",
      biddingvalue: "",
    };
  },
  methods: {
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
      this.errmessage = "";
      try {
        await axios.post(
          "https://online-auction0.herokuapp.com/v1/bid",
          {
            value: this.biddingvalue,
            auctionId: this.currentid,
          },
          {
            headers: {
              Authorization: "bearer " + window.localStorage.getItem("token"),
            },
          }
        );
        this.close();
      } catch (e) {
        this.errmessage = e.response.data.message;
      }
      if (this.biddingvalue == "") {
        this.errmessage = "make sure to place your bid";
      }
    },
    highestbid() {
      this.bids = this.item.bids;
      console.log(this.item.item.startingPrice);
      if (this.bids.length != 0) {
        return this.item.bids[this.bids.length - 1].value;
      } else {
        return this.item.currentPrice;
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.user = this.$route.params.user;
    try {
      axios
        .get(
          `https://online-auction0.herokuapp.com/v1/auction?Id=${this.id}`,
          {
            headers: {
              Authorization: "bearer " + window.localStorage.getItem("token"),
            },
          },
          {
            id: this.id,
          }
        )
        .then((res) => {
          this.item = res.data;
        });
    } catch (e) {
      console.log(e.response.data);
    }
  },
};
</script>
<style lang="css">
.homea {
  position: absolute;
  top: 0;
  top: 0;
  left: 300px;
  height: 100%;
  width: calc(100% - 250px);
  background-color: var(--body-color);
  transition: var(--tran-05);
}
</style>

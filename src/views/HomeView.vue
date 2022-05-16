<template>
  <div class="home bg-blue-400">
    <h1 v-if="!user" class="text-4xl text-center mt-52">
      You are not logged in
    </h1>
    <div v-if="user">
      <div class="grid-cols-2 grid ml-60">
        <div class="mt-7">
          <label class="text-xl" for="filter">chose filter: </label>
          <div class="inline-block relative w-52">
            <select
              id="filter"
              v-on:change="changeRoute()"
              v-model="myaucfilter"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option selected disabled>default</option>
              <option value="1">show my items</option>
              <option value="2">show my bids</option>
            </select>
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
        <div class="mt-7">
          <div class="">
            <input
              v-model="search"
              type="search"
              class="bg-purple-white shadow rounded-xl border-0 pl-3 p-2"
              placeholder="Search by name..."
            />
          </div>
        </div>
      </div>
      <div v-for="auction in searchfilter" :key="auction.item">
        <div class="p-10 w-1/3 float-left">
          <div
            @click="expand(auction.id)"
            class="bg-white rounded-md flex flex-col overflow-hidden height cursor-pointer shadow-xl"
          >
            <img class="w-full h-48" :src="auction.item.photoUrl" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">
                <span class="text-blue-500">name:</span> {{ auction.item.name }}
              </div>
              <div class="font-bold text-xl mb-2">
                <span class="text-blue-500">Price:</span> ${{
                  auction.item.startingPrice
                }}
              </div>
              <div class="font-bold text-xl mb-2">
                <span class="text-blue-500">End date:</span> {{}}
              </div>
            </div>
            <div class="ml-1/2">
              <button
                v-if="auction.username == user.userName"
                @click="deletitem(auction.id)"
                id="delete-btn"
                class="ml-5 bg-red-500 delay-400 mb-5 w-96 duration-300 hover:bg-red-800 text-white py-1 px-4 rounded-full"
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
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import login from "@/components/login.vue";

export default {
  name: "HomeView",
  props: ["user"],
  data() {
    return {
      currentid: "",
      biddingvalue: "",
      date: "",
      myaucfilter: null,
      expanditem: "",
      search: null,
    };
  },
  async updated() {
    if (this.myaucfilter) {
      const res = await axios.get(
        `https://online-auction0.herokuapp.com/v1/auctions?AuctionFilterType=${this.myaucfilter}`,
        {
          headers: {
            Authorization: "bearer " + window.localStorage.getItem("token"),
          },
        }
      );

      this.auc = res.data.data;
      console.log(res);
    } else {
      const res = await axios.get(
        `https://online-auction0.herokuapp.com/v1/auctions`,
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
    }
  },
  computed: {
    searchfilter: function () {
      if (this.search) {
        return this.auc?.filter((sss) => {
          return sss.item.name.match(this.search);
        });
      } else {
        return this.auc;
      }
    },
  },
  methods: {
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
      );
    },
    converttime(date) {
      const utcDate = date;
      this.date = new Date(utcDate);
      return this.date;
    },
    expand(aucid) {
      this.$router.push({ name: "card", params: { id: aucid } });
    },
    changeRoute() {
      if (this.myaucfilter == 1) {
        this.$router.push("/myitems");
      } else {
        this.$router.push("/mybids");
      }
    },
  },
};
</script>
<style lang="css">
.home {
  height: 500vh;
}
</style>

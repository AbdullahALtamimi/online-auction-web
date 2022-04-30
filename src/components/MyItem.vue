<template class="h-full" lang="">
  <div class="">
    <div  v-for="(item) in object" :key="item.name">
      <div class="bg-blue-400 p-10 w-1/3 float-left">
        <!--Card 1-->
        <div :style="{background:colorVariant}" class="bg-white rounded-md overflow-hidden max-h-96 shadow-xl">
          <img class="w-full h-52" :src="item.photoUrl" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              <span class="text-blue-500">name:</span> {{ item.name }}
            </div>
            <div class="font-bold text-xl mb-2">
             <span class="text-blue-500">Price:</span>  {{ item.startingPrice }} Dinars
            </div>
            <p class="text-gray-700 text-base">
              {{ item.description }}
            </p>
          </div>
          <div class="ml-1/2 pt-2 pb-2">
            <button
              @click="publish(item.id)"
              id="pub-btn"
              class="ml-5 delay-400 duration-300 bg-blue-500 hover:bg-blue-800 text-white py-1 px-4 rounded-full"
            >
              Publish
            </button>
            <button
              @click="deletitem(item.id)"
              id="delete-btn"
              class="ml-5 bg-red-500 delay-400 duration-300 hover:bg-red-800 text-white py-1 px-4 rounded-full sm:ml-1 sm:absolute "
            >
              Delete
            </button>
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
          <label name="date">Enter the expiration date:</label>
          <input
            v-model="date"
            class="ml-3 bg-gray-200 border-2 border-blue-500 rounded-md"
            type="date"
            id="date"
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
            @click="sendauc()"
          >
            send auction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "myitem",

  data() {
    return {
      object: "",
      date: "",
      currentselecteditem: "",
      colorVariant:""
    };
  },

  created() {
    axios
      .get("https://online-auction0.herokuapp.com/v1/myitems", {
        headers: {
          Authorization: "bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((res) => (this.object = res.data));
  },
  methods: {
    publish(itemid) {
      const popup = document.querySelector(".hello");
      popup.style.display = "block";
      this.currentselecteditem = itemid;
    },
    close() {
      const popup = document.querySelector(".hello");
      popup.style.display = "none";
    },
    async sendauc() {
      var date = new Date(this.date);
      const isoStr = date.toISOString();
      await axios.post(
        "https://online-auction0.herokuapp.com/v1/auction",
        {
          expireDate: isoStr,
          itemId: this.currentselecteditem,
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
          `https://online-auction0.herokuapp.com/v1/item?itemId=${itemid}`,
          {
            headers: {
              Authorization: "bearer " + window.localStorage.getItem("token"),
            },
          },

          {
            id: itemid,
          }
        )
        ;
    },
  },
};
</script>
<style lang=""></style>

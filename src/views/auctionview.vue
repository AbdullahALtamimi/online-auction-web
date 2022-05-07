<template>
  <div class="home">
    <auction/>
  </div>
</template>

<script>
// @ is an alias to /src
import auction from "@/components/auction.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "auctionview",
  components: {
    auction,
  },
};
</script>
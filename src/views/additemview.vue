<template>
  <div class="home">
    <login/>
  </div>
</template>

<script>
// @ is an alias to /src
import login from "@/components/addItem.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "additemview",
  components: {
    login,
  },
};
</script>

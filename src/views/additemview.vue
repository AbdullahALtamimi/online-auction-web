<template>
  <div class="home">
    <additem/>
  </div>
</template>

<script>
// @ is an alias to /src
import additem from "@/components/addItem.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "additemview",
  components: {
    additem,
  },
};
</script>

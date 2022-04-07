<template lang="">
  <div class="text-3xl justify-center text-red-900">
  {{data.item[0]}}
  </div>
</template>
<script>
import axios from "axios";
import vue from "vue"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "myitem",
  
  data() {
    return {
      data:this.$data,
    };
    
  },
  methods: {
     send(){
            vue.prototype.$data = this.data
       },
   
   async created() {
    const result = await axios.get("https://online-auction0.herokuapp.com/v1/myitems", {
        headers: {
          Authorization: "bearer " + window.localStorage.getItem("token"),
        },
      });
        console.log(result)
    },
  },
};
</script>
<style lang=""></style>

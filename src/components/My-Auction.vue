
<template lang="">
    <div>
       
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:"my-auction",
 data(){
     return {

     };
 },
  created() {
    axios
      .get("https://online-auction0.herokuapp.com/v1/myitems", {
        headers: {
          Authorization: "bearer " + window.localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res));  


},
}


</script>
<style lang="">
    
</style>
<template>
  <nav>
     <navbar />
  </nav>
  <router-view/>
</template>

<style>

</style>
<script>
   import navbar from './components/navbar.vue'
   export default {
  name: "App",
  components: {
    navbar,
  },
};
</script>
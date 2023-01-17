<template>
  <div class="about">
    <Navbar />
    <h1>About Page</h1>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
  export default {
    name: "About",
    components:{
      Navbar,
    },
    data() {
    return {
    }
  },
}
</script>

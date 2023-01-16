<template>
  <div class="about">
    <Navbar />
    <h1>About Page</h1>
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
  export default {
    name: "About",
    components:{
      Navbar,
      Footer
    },
    data() {
    return {
    }
  },
}
</script>

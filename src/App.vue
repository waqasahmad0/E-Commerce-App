<template>
   <v-app >
    <v-main v-if="auth">
      <router-view></router-view>
      
    </v-main>
    <v-main v-else>
      <router-view></router-view>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components:{
    Footer
  },
  data: () => ({
    //
    auth: false
  }),
  methods:{

  },
  computed(){
    this.auth= localStorage.getItem('userAuth');
  }
};
</script>

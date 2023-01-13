<template>
<div>
    <Navbar />
    <Header />
    <v-container>
        <v-row>
            <v-col>
                <ProductView />
            </v-col>
        </v-row>
    </v-container>
</div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import ProductView from './ProductView.vue';
import Header from '@/components/Header.vue'
export default {
    name: "Home",
    components: {
        Navbar,
        ProductView,
        Header
    },
    methods: {
        onStart() {
            if (this.$store.state.user == undefined || this.$store.state.user.length == 0) {
                this.$route.push({
                    name: 'user-login'
                });
            }
        }
    },
    created() {
        this.onStart();
    }
}
</script>

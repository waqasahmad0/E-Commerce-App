<template>
<div>
    <Navbar />
    <v-container class="mt-10 border">
        <v-row>
            <v-col col="5">
                <!-- product images will show in carousel -->
                <v-carousel elevation-10>
                    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col col="7">
                <v-dialog v-model="dialog" width="500">
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Privacy Policy
                        </v-card-title>
                        <v-text-field v-model="titlee" counter="25" label="Enter New Title">
                        </v-text-field>
                        <v-text-field v-model="descriptionn" counter="25" label="Enter New Description">
                        </v-text-field>
                        <v-divider></v-divider>
                        {{ titlee }}{{ descriptionn }}
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="updateProductDataa">
                                Update
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-layout row>
                    <v-col col="9">
                        <h3>{{ info.title }}</h3><small>{{ info.brand }}</small>
                    </v-col>
                    <v-col col="9">
                        <v-btn color="success" @click="openDialoge">Update Title <v-icon>mdi-pen</v-icon>
                        </v-btn>
                    </v-col>
                </v-layout>
                <v-rating v-model="info.rating" readonly background-color="pink lighten-3" color="pink"></v-rating>
                <div class="grey--text ms-4">
                    <h6>({{ info.rating }})</h6>
                </div>
                <h3 class="mt-6">Description</h3>
                <div class="grey--text ms-4">
                    {{ info.description }}
                </div>
                <h3 class="mt-6">Price</h3>
                <div class="grey--text ms-4">
                    <strong class="black--text">$</strong> {{ info.price }} <strong class="black--text">
                        Discount</strong> {{ info.discountPercentage }}%
                </div>
                <div class="grey--text mt-7">
                    <strong class="black--text">91%</strong> of buyers enjoyed this product! <strong class="black--text"> (87 votes)</strong>
                </div>
                <h5 class="mt-6" v-if="info.category == 'womens-dresses' || info.category == 'womens-shoes' || info.category == 'mens-shoes' || info.category == 'mens-dresses'">
                    Sizes:
                    <v-btn icon class="red ms-2" color="white">
                        <v-icon>mdi-size-s</v-icon>
                    </v-btn>
                    <v-btn icon class="red ms-2" color="white">
                        <v-icon>mdi-size-m</v-icon>
                    </v-btn>
                    <v-btn icon class="red ms-2" color="white">
                        <v-icon>mdi-size-l</v-icon>
                    </v-btn>
                    <v-btn icon class="red ms-2" color="white">
                        <v-icon>mdi-size-xl</v-icon>
                    </v-btn>
                </h5>
                <v-btn @click="count(info.id)" color="info" elevation="24" class="mt-5" x-large>Add to Cart</v-btn>
            </v-col>
        </v-row>
    </v-container>

</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: "ProductDetailView",
    components: {
        Navbar
    },
    computed: {
        ...mapGetters(['items']),
        ...mapGetters(['info'])
    },
    data() {
        return {
            titlee: '',
            descriptionn: '',
            dialog: false,
        }
    },
    methods: {
        ...mapActions(['getProductt']),
        ...mapActions(['count']),
        // open dialoge for update product data
        openDialoge() {
            this.dialog = true;
        },
        // update product data
        updateProductDataa() {
            this.dialog = false;
        }
    },
    created() {
        // get product data
        this.getProductt();
    }
}
</script>

<template>
<div>
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
                        <v-text-field v-model="updatedProductInfo.titlee" counter="25" label="Enter New Title">
                        </v-text-field>
                        <v-text-field v-model="updatedProductInfo.descriptionn" counter="25" label="Enter New Description">
                        </v-text-field>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="updateProductDataa(info.id)" >
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
                        <v-btn color="success" @click="openDialoge" v-if="userAuth==true">Update Title <v-icon>mdi-pen</v-icon>
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
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: "ProductDetailView",
    computed: {
        ...mapGetters(['items']),
        ...mapGetters(['info'])
    },
    data() {
        return {
            updatedProductInfo: {
                titlee: '',
                descriptionn: ''
            },
            dialog: false,
            userAuth: false
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
        async updateProductDataa(id) {
            this.dialog = false;
            const fetchProduct = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.updatedProductInfo.titlee,
                    description: this.updatedProductInfo.descriptionn
                })
            })
            console.log(fetchProduct);
            alert("Product Updated Successfully. Open Console to see the response.");
        }
    },
    created() {
        // get product data
        this.getProductt();
    },
    mounted(){
        localStorage.getItem('user') ? this.userAuth = true : this.userAuth = false;
    }
}
</script>

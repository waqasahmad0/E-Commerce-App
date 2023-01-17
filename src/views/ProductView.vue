<template>
<v-container>
    <template>
        <!-- Here we are displaying all the categories of Products-->
        <v-chip v-for="category in allCategories" :key="category" v-on:click="categoryProduct(category)" color="info" class="ma-2">
            {{ category }}
        </v-chip>
    </template>
    <v-row class="text-center">
        <v-dialog v-model="dialog">
            <v-btn color="error" @click="dialog = false">
                Close <v-icon>mdi-close-thick</v-icon>
            </v-btn>
            <v-layout row>
                <!-- it is used to show all the products of specific category which user will select -->
                <v-card v-for="item in searched" :key="item.id" class="mx-auto my-12" max-width="374">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <v-img height="250" :src=item.thumbnail @click="getProduct(`${item.id}`)"></v-img>
                    <v-card-title @click="getProduct(`${item.id}`)">{{ item.title }}</v-card-title>
                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <v-rating :value=item.rating color="primary" dense half-increments readonly size="14"></v-rating>
                            <div class="grey--text ms-4">
                                {{ item.rating }}
                            </div>
                        </v-row>
                        <div class="my-4 text-subtitle-1">
                            $ • {{ item.price }}
                        </div>
                        <div>{{ item.description }}</div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text class="dis">
                        <h6>Category: </h6>
                        <p>{{ item.category }}</p>
                        <h6>Discount: </h6>
                        <p>{{ item.discountPercentage }}%</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="deep-purple" class="white--text" id="cartid${ item.id }" @click="count(item.id)">
                            Add to Cart
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>

        </v-dialog>

    </v-row>
    <!-- ****************************** -->
    <v-layout row class="d-flex">
        <!-- Here we are displaying all the products -->
        <v-card v-for="product in updatePage" :key="product.id" class="mx-auto my-12" max-width="280">
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <v-img height="250" :src=product.thumbnail>
                <v-chip color="red mt-2 ms-2">{{ product.discountPercentage }}% OFF</v-chip>
            </v-img>
            <v-card-title id="productTitle" @click="getProduct(`${product.id}`)">{{ product.title }}</v-card-title>
            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :value=product.rating color="primary" dense half-increments readonly size="14"></v-rating>
                    <div class="grey--text ms-4">
                        {{ product.rating }}
                    </div>
                </v-row>
                <v-layout class=" text-subtitle-1">
                    
                    <v-col class="red--text"> $ • {{ product.price }}<br /> <p class="my-0 grey--text">After Discount:</p> <p class="text-subtitle-1 text-decoration-underline green--text">$ • {{ Math.ceil(product.price - ((product.discountPercentage / 100) * product.price)) }}</p></v-col>
                    
                </v-layout>
                <div>{{ product.description }}</div>
            </v-card-text>
            <v-card-text class="dis">
                <h6>Category:<p class="text-uppercase black--text mt-2">{{ product.category }}</p>
                </h6>
            </v-card-text>
            <v-card-actions>
                <v-btn color="deep-purple" class="white--text" @click="count(product.id)">
                    Add to Cart
                </v-btn>
                <v-btn fab color="red" class="white--text ms-8" @click="deleteProductt(product.id)" v-if="userAuth==true">
                    <v-icon>
                        mdi-trash-can
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-pagination class="pagination mb-2" v-model="page" :length="pageCount">
        </v-pagination>
    </v-layout>
</v-container>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    name: "ProductView",
    data() {
        return {
            page: 1,
            pageSize: 10,
            dialog: false,
            userAuth: false,
        }
    },
    created() {

    },
    computed: {
        ...mapGetters(['uProducts']),
        //it will update the page products according to the page number
        updatePage() {
            let _start = (this.page - 1) * this.pageSize;
            let _end = _start + this.pageSize;
            this.$vuetify.goTo(0)
            return this.uProducts.slice(_start, _end);
        },
        ...mapGetters(['allCategories']),
        ...mapGetters(['searched']),
        //it will return the total number of pages
        pageCount() {
            return Math.ceil(this.uProducts.length / this.pageSize)
        }

    },
    methods: {
        ...mapActions(['fetchProducts']),
        ...mapActions(['getCategories']),
        ...mapActions(['categoryProducts']),
        ...mapActions(['count']),
        async deleteProductt(id) {
            console.log(id);
            const fetchProduct = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'DELETE',
            })
            console.log(fetchProduct);
            alert("Product Deleted Successfully. Open console to see the response");
        },
        //it will show the products of specific category
        categoryProduct(val) {
            this.categoryProducts(val);
            this.dialog = true;
        },
        //it will update the id of the product which user will select
        getProduct(payload) {
            this.$store.commit('updateProductId', payload)
            this.$store.dispatch('getProduct');
        }
    },
    mounted() {
        this.fetchProducts();
        this.getCategories();
        localStorage.getItem('user') ? this.userAuth = true : this.userAuth = false;
    },
}
</script>
<style>
#productTitle:hover {
    color:grey;
    cursor: pointer;
}
</style>
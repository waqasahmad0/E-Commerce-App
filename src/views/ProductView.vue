<template>
<v-container>

    <template>
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
                <v-card v-for="item in searched" :key="item.id" class="mx-auto my-12" max-width="374">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>

                    <v-img height="250" :src=item.thumbnail></v-img>

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

        <v-card v-for="product in updatePage" :key="product.id" class="mx-auto my-12" max-width="280">
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" :src=product.thumbnail>
                <v-chip color="red mt-2 ms-2">{{ product.discountPercentage }}% OFF</v-chip>
            </v-img>

            <v-card-title @click="getProduct(`${product.id}`)">{{ product.title }}</v-card-title>

            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :value=product.rating color="primary" dense half-increments readonly size="14"></v-rating>

                    <div class="grey--text ms-4">
                        {{ product.rating }}
                    </div>
                </v-row>

                <v-layout class="my-4 text-subtitle-1">
                    <div> $ • </div>
                    <div class="text-decoration-line-through"> {{ product.price }}</div>
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

            </v-card-actions>
        </v-card>
        <v-pagination 
        class="pagination mb-2" 
        v-model="page" 
        :length="pageCount"
        >
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
        }
    },
    created() {
		
	},
    computed: {
        ...mapGetters(['uProducts']),
        updatePage() {
			let _start = (this.page - 1) * this.pageSize;
			let _end = _start + this.pageSize;

			return this.uProducts.slice (_start, _end);
		},
        ...mapGetters(['allCategories']),
        ...mapGetters(['searched']),
        pageCount(){
            return Math.ceil(this.uProducts.length/this.pageSize)
        }
        
    },
    methods: {
        ...mapActions(['fetchProducts']),
        ...mapActions(['getCategories']),
        ...mapActions(['categoryProducts']),
        ...mapActions(['count']),
        // initPage() {
		// 	this.listCount = this.uProducts.length;
		// 	if (this.listCount < this.pageSize) {
		// 		this.historyList = this.uProducts;
		// 	} else {
		// 		this.historyList = this.uProducts.slice(0, this.pageSize);
		// 	}
		// },
		
        categoryProduct(val) {
            this.categoryProducts(val);
            this.dialog = true;
        },
        getProduct(payload) {
            this.$store.commit('updateProductId', payload)
            this.$store.dispatch('getProduct');
            // console.log(this.$store.state.productId);
        }
    },
    mounted() {
        this.fetchProducts();
        this.getCategories();
        // this.initPage();
		// this.updatePage();
    },
}
</script>
<template>
<nav>
    <v-app-bar flat class="warning">
        <v-app-bar-nav-icon v-on:click="drawer=!drawer"></v-app-bar-nav-icon>

        <v-toolbar-title><img src="../assets/D'Country Store.png" alt="logo" width="330" height="40" class="d-none d-sm-block d-md-block d-lg-block"></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="dialog=true">

            <v-icon>mdi-plus-circle-outline</v-icon>
            <v-snackbar v-model="snackbar" absolute top right color="success">
                <v-icon dark class="me-3">
                    mdi-checkbox-marked-circle
                </v-icon>
                <span>New Product Added!!</span>

            </v-snackbar>
            <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
                <template>
                    <v-card>
                        <v-toolbar color="primary" dark>Add New Product</v-toolbar>
                        <v-card-text>

                            <v-form ref="form" @submit.prevent="submitForm(obj)">
                                <v-container fluid>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <v-text-field v-model="obj.title" color="purple darken-2" label="Product Title" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field v-model="obj.last" color="blue darken-2" label="Product Brand" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="obj.bio" color="teal">
                                                <template v-slot:label>
                                                    <div>
                                                        Description
                                                    </div>
                                                </template>
                                            </v-textarea>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-select v-model="obj.category" :items="fullList" color="pink" label="Category" required></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <v-card-actions>
                                    <v-btn color="error" @click="dialog= false">
                                        Close
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="resetForm">
                                        Reset
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="dialog= false" type="submit">
                                        Add Product
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </template>
            </v-dialog>
        </v-btn>

        <v-btn icon VueRouter :to="cartRoute">
            <v-badge :content="counter" :value="counter" color="red" overlap>
                <v-icon>mdi-cart</v-icon>
            </v-badge>
        </v-btn>
        <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon @click="searchDialog=true">mdi-magnify</v-icon>
            <v-dialog v-model="searchDialog" class="text-center">
                <v-card>
                    <v-row>
                        <v-col cols="12">
                            <v-col cols="12">
                                <v-text-field v-model="searchInput" label="Search Products" placeholder="Search" filled rounded dense></v-text-field>
                            </v-col>
                        </v-col>
                    </v-row>
                    <v-row>

                        <v-col cols="11">
                            <!-- ************* -->

                            <v-layout row class="d-flex" v-if="searchedByWords.length>0">

                                <v-card v-for="product in searchedByWords" :key="product.id" class="mx-auto my-12" max-width="280">
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
                            </v-layout>

                            <!-- ************* -->
                        </v-col>
                    </v-row>
                </v-card>
                <v-btn color="yellow" @click="searchProducts(searchInput)">Search</v-btn>
                <v-btn color="red" class="mt-2" @click="close">Close</v-btn>
            </v-dialog>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="warning">
        <v-list flat>
            <v-subheader>
                <v-toolbar-title><img src="../assets/D'Country Store.png" alt="logo" width="230" height="40" class="d-block d-sm-none d-md-none d-lg-none"></v-toolbar-title>
            </v-subheader>
            <v-list-item-group v-model="selectedItem">
                <v-list-item v-for="(item, i) in items" :key="i" VueRouter :to="item.route">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
    <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="primary" @click="toTop">
        <v-icon>mdi-arrow-up-thick</v-icon>
    </v-btn>
</nav>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    data() {
        return {
            searchInput: '',
            dialog: false,
            searchDialog: false,
            obj: {
                title: '',
                last: '',
                bio: '',
                category: '',
            },
            cartRoute: '/user-cart',
            terms: false,

            fullList: ["smartphones",
                "laptops",
                "fragrances",
                "skincare",
                "groceries",
                "home-decoration",
                "furniture",
                "tops",
                "womens-dresses",
                "womens-shoes",
                "mens-shirts",
                "mens-shoes",
                "mens-watches",
                "womens-watches",
                "womens-bags",
                "womens-jewellery",
                "sunglasses",
                "automotive",
                "motorcycle",
                "lighting"
            ],
            conditions: false,
            snackbar: false,

            image: this.$store.state.user.image,
            route1: '/',
            route2: '/user-login',
            drawer: false,
            selectedItem: 1,
            items: [{
                    text: 'Home',
                    icon: 'mdi-home',
                    route: '/'
                },
                {
                    text: 'About',
                    icon: 'mdi-information-variant',
                    route: '/about'
                },
                {
                    text: 'Profile',
                    icon: 'mdi-account',
                    route: '/user-profile'
                },
            ],
            fab: false,
        }
    },
    computed: {
        ...mapGetters(['counter']),
        ...mapGetters(['searchedByWords']),
        userData: {
            get() {
                return this.$store.state.user;
            }
        },
    },
    methods: {
        ...mapActions(['logout']),
        ...mapActions(['searchProducts']),
        ...mapActions(['count']),
        ...mapActions(['fetchProducts']),
        onScroll(e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop() {
            this.$vuetify.goTo(0)
        },
        resetForm() {
            this.$refs.form.reset()
        },
        search(value) {
            console.log(value);
            this.searchProducts(value);
        },
        submitForm(object) {
            this.snackbar = true
            console.log(object.title, "In Component");
            this.$store.dispatch('submit', object);
            this.resetForm();

        },
        getProduct(payload) {
            this.$store.commit('updateProductId', payload)
            this.$store.dispatch('getProduct');
            // console.log(this.$store.state.productId);
        },
        close() {
            this.searchDialog = false;
        }
    }

}
</script>

<style>

</style>

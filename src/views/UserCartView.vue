<template>
<div class="about">
    <!-- if there is no product in the cart then this container will run-->
    <v-container class="text-center" v-if="this.$store.state.cart.length==0">
        <h1>No Products Added</h1>
    </v-container>
    <!-- if there is product in the cart then this container will run-->
    <v-container v-else>
        <v-row v-for="(product,index) in cart" :key="product.id">
            <v-col>
                <v-img :src="product.thumbnail" alt="Product Image">
                    <v-chip class="red mt-2 ms-2">{{ product.discountPercentage }} % OFF</v-chip>
                </v-img>
            </v-col>
            <v-col>
                <v-row>
                    <v-col>
                        <h3>{{ product.title }} </h3>
                    </v-col>
                    <v-col class="mt-2">
                        <h5 class="red--text text-decoration-line-through">$ {{ product.price }}</h5>
                        <h5 class="green--text">$ {{ Math.ceil(product.price * product.quantity - ((product.discountPercentage/100)*product.price)) }}</h5>
                    </v-col>
                    <v-col>
                        <v-btn icon @click="remove(index)" class="red white--text">
                            <v-icon>
                                mdi-window-close
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-layout>
                            <h6>Available Stock: </h6>
                            <p>{{ product.stock }} </p>
                        </v-layout>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-layout>
                            <p>Category: </p>
                            <p class="gray--text lignten-2" bold> {{ product.category }}</p>
                        </v-layout>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-layout>
                            <v-btn @click="product.quantity++" class="mx-2"  fab dark color="indigo">
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                            <p class="mt-4">{{ product.quantity }}</p>
                            <v-btn @click="product.quantity--" class="mx-2" :disabled="product.quantity<=1" fab dark color="indigo">
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                        </v-layout>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="mt-8">
            <v-layout>
                <v-col col="6">

                </v-col>
                <v-col col="6">
                    <v-row>
                        <v-col col="6">
                            <h2>Total: </h2>
                        </v-col>
                        <v-col col="6">
                            <h1>$ {{ Math.ceil(calcSum) }}</h1>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col col="6">
                            <!-- in this component only checkout button will show and when user will click on that button a dialog box will show on which user will input the address etc -->
                            <CheckOut />
                        </v-col>
                    </v-row>
                </v-col>
            </v-layout>
        </v-row>
    </v-container>
</div>
</template>

<script>
import CheckOut from '@/components/CheckOut.vue';
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    name: "About",
    components: {
        CheckOut,
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['cart']),
        ...mapGetters(['totalAmount']),
        // this function will calculate the total amount of the cart
        calcSum() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity - ((item.discountPercentage / 100) * item.price)), 0)
        }
    },
    methods: {
        ...mapActions(['removeItem']),
        // this function will remove the product from the cart
        remove(index) {
            this.removeItem(index);
        },

    },
}
</script>

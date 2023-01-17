import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //storing user data after login
    "user": {},
    //storing all the products data
    "products": [],
    //storing all the categories names
    "categories": [],
    //storing all the products of the category on which user clicks
    "searchedItems": [],
    //storing the boolean value whether the user is logged in or not
    "needAuth": false,
    //storing all the images of the product which user want to see the product details
    "items": [],
    //it will store all the information about the product which user want to see the specific product details
    "info": {},
    //it will store the product id which user wants to see the details through this id i wil get the products details from api
    "productId": '',
    // it will count the number of products in cart
    "counter": 0,
    //it will store user cart products data
    "cart": [],
    //it will store all products that user will search by typing
    "searchedByWords": [],
    "totalAmount": 0
  },
  getters: {
    //if user want to use the value from of any state he will get it through getter
    user: state => state.user,
    uProducts: state => state.products,
    allCategories: state => state.categories,
    searched: state => state.searchedItems,
    needAuth: state => state.needAuth,
    items: state => state.items,
    info: state => state.info,
    counter: state => state.counter,
    cart: state => state.cart,
    searchedByWords: state => state.searchedByWords,
    totalAmount: state => state.totalAmount,
  },
  mutations: {
    //if you want to change the state of the any variable you can change it through that variable mutation
    updateUserData(state, userName) {
      state.userName = userName;
    },
    updateUserInfo(state, user) {
      state.user = user;
    },
    updateUserProducts(state, products) {
      state.products = products;
    },
    updateProductsCategory(state, categories) {
      state.categories = categories;
    },
    updateSearchedItems(state, searchedItems) {
      state.searchedItems = searchedItems;
    },
    updateItems(state, items) {
      state.items = items;
    },
    updateInfo(state, info) {
      state.info = info;
    },
    updateProductId(state, productId) {
      state.productId = productId;
    },
    updateNewProduct(state, value) {
      state.products.unshift(value);
    },
    updatecounter(state, value) {
      state.counter = value;
    },
    updateCart(state, value) {
      state.cart.push(value);
    },
    REMOVE_PRODUCT(state, index) {
      state.cart.splice(index, 1);
    },
    updateSearchedByWords(state, value) {
      state.searchedByWords = value;
    },
    updateNeedAuth(state, value) {
      state.needAuth = value;
    },
    updateTotalAmount(state, value) {
      state.totalAmount = value;
    },
  },
  actions: {
    //fetching user details and checking wether the input details exists or not and then if exists the fetching all the data of that user
    async fetchUserData(state, user) {
      console.log(user);
      const getUserData = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.uName,
          password: user.uPassword,
        })
      })
      const convertUserData = await getUserData.json();
      localStorage.setItem('user', JSON.stringify(convertUserData));
      if (getUserData.status == 200) {
        // const userAuth = true;
        localStorage.setItem('userAuth', true)
        window.location.replace('/');
      } else {
        alert("Invalid Username/Password");
      }
    },
    //fetching all the products and then update that state 
    async fetchProducts({ commit }) {
      const getProducts = await fetch(`https://dummyjson.com/products?limit=100`);
      const getAllProducts = await getProducts.json();
      commit('updateUserProducts', getAllProducts.products);
    },
    //fetching all the categories names and update allCategories state
    async getCategories({ commit }) {
      const category = await fetch('https://dummyjson.com/products/categories');
      const allProductCategory = await category.json();
      commit('updateProductsCategory', allProductCategory);
    },
    //get all the products of the category which user selects
    async categoryProducts({ commit }, value) {
      const getCategory = await fetch(`https://dummyjson.com/products/category/${value}`);
      const searchedItems = await getCategory.json();
      commit('updateSearchedItems', searchedItems.products);
    },
    //it is used for storing the product id which user wants to see the details
    getProduct() {
      localStorage.setItem('searchedID', this.state.productId);
      router.push({ name: 'ProductDetailView' });
    },
    //it will fetch the product details of the product which user wants to see the details
    async getProductt({ commit }) {
      const id = localStorage.getItem('searchedID');
      const fetchProduct = await fetch(`https://dummyjson.com/products/${id}`);
      const fetchedProduct = await fetchProduct.json();
      commit('updateItems', fetchedProduct.images)
      commit('updateInfo', fetchedProduct);
    },
    //it will count the number of products in the cart and also fetching the products for the cart
    async count({ commit }, val) {
      if (localStorage.getItem('user') ?  true : false) {
        const value = this.state.counter + 1;
        commit('updatecounter', value);
        const cartProduct = await fetch(`https://dummyjson.com/products/${val}`);
        const newCart = await cartProduct.json();
        newCart.quantity = 1;
        commit('updateCart', newCart);
      }else{
        alert("Please Login First");
      }
    },
    //it will remove the product from the cart
    removeItem(context, val) {
      context.commit('REMOVE_PRODUCT', val);
      this.state.counter--;
    },
    //it is used to add new product in the database
    async submit({ commit }, obj) {
      console.log(obj, "In Store");
      const addNewProduct = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: obj.title,
          description: obj.bio,
          brand: obj.last,
          category: obj.category,
        })
      })
      console.log("New Product Added Status: ", addNewProduct.status);
      console.log("New Product: ", addNewProduct);
      commit('updateNewProduct', addNewProduct)
    },
    //it will fetch the products which user searched by the keyword
    async searchProducts({ commit }, value) {
      console.log(value);
      const searchByKeyword = await fetch(`https://dummyjson.com/products/search?q=${value}`);
      const prod = await searchByKeyword.json();
      commit('updateSearchedByWords', prod.products);
      console.log(prod.products);
    },
    //used to logout the user
    logout() {
      localStorage.clear();
      localStorage.setItem('userAuth', false);
      window.location.reload();
      router.replace({
        name: 'home'
      });

    },
  },
  modules: {
  },
})

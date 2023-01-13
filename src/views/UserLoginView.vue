<template>
<v-container>
    <v-row>
        <v-col col="4"></v-col>
        <v-col col="4">
            <v-form ref="form" @submit="submit" lazy-validation>
                <h1 class="text-center pa-15 m-15">Login</h1>
                <v-text-field v-model="user.uName" label="Name" required></v-text-field>

                <v-text-field type="password" v-model="user.uPassword" label="Password" required></v-text-field>
                <v-btn color="info" class="mr-4" type="submit">
                    Login
                </v-btn>
                <v-btn color="error" class="mr-4" @click="reset" >
                    Reset Form
                </v-btn>
            </v-form>
        </v-col>
        <v-col col="4"></v-col>
    </v-row>
</v-container>
</template>
<script>
export default {
    data(){
        return{
            user:{
                uName:'',
                uPassword:''
            }
        }
    },
    methods: {
        // reset form
        reset() {
            this.$refs.form.reset();
        },
        //logout
        logout(){
            this.$router.push({name:'user-login'})
            localStorage.clear();
        },
        //submit form
        submit(e){
            e.preventDefault();
            this.$store.dispatch('fetchUserData',this.user);
        }
    },
}
</script>
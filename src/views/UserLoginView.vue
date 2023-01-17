<template>
    <div>
    <v-row>
        <v-col col="4"></v-col>
        <v-col col="4">
            <v-form ref="form" @submit="submit" lazy-validation>
                <h1 class="text-center pa-15 m-15">Login</h1>
                <v-text-field v-model="user.uName" label="Name" required></v-text-field>
                <p class="text-center">{{ emailError }}</p>
                <v-text-field type="password" v-model="user.uPassword" label="Password" required></v-text-field>
                <v-btn color="info" class="mr-4" type="submit">
                    Login
                </v-btn>
                <v-btn color="error" class="mr-4" @click="reset">
                    Reset Form
                </v-btn>
            </v-form>
        </v-col>
        <v-col col="4"></v-col>
    </v-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                uName: '',
                uPassword: ''
            },
            emailError: '',
        }
    },
    methods: {
        // reset form
        reset() {
            this.$refs.form.reset();
        },
        //submit form
        submit(e) {
            if (this.user.uName == '' || this.user.uPassword == '') {
                this.emailError = 'Enter Email';
                e.preventDefault();
                return;
            } else {
                e.preventDefault();
                this.$store.dispatch('fetchUserData', this.user);
            }
        }
    },
}
</script>

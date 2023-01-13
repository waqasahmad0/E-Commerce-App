<template>
<v-container align="center" justify="center" class="mt-0">
    <v-row class="bg-img" justify="space-around">
        <v-col cols="12">
            <v-card align-center width="400">
                <v-img height="200px" src="https://cdn.pixabay.com/photo/2021/07/09/06/52/lavender-6398415_960_720.jpg">
                    <v-app-bar class="mt-8" flat color="rgba(1, 0, 0, 0)">
                        <v-avatar size="100">
                            <img alt="user" :src="data.image">
                        </v-avatar>
                    </v-app-bar>
                    <v-card-title class="white--text mt-8">
                        <p class="ml-3">
                            {{data.firstName}} {{ data.lastName }}
                        </p>
                    </v-card-title>
                </v-img>
                <v-card-text>
                    <div class="font-weight-bold ml-8 mb-2">
                        Details
                    </div>
                    <v-list two-line>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">
                                    mdi-account
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <h5>{{ data.username }}</h5>
                                </v-list-item-title>
                                <v-list-item-subtitle>ID: {{ data.id }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">
                                    mdi-email
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{data.email}}</v-list-item-title>
                                <v-list-item-subtitle>{{ data.gender }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">
                                    mdi-counter
                                </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Token</v-list-item-title>
                                <v-list-item-subtitle>{{data.token}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
export default {
    name: "UserProfileView",
    data() {
        return {
            data: JSON.parse(localStorage.getItem('user'))
        }
    },
}
</script>
<style>
.bg-img {
    background-image: url("https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    border-radius: 3px;
}
</style>

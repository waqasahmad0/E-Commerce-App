<template>
<v-footer padless class="mt-15">
    <v-card flat tile class="indigo lighten-5 gray--text text-center">
        <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 gray--text" icon>
                <v-icon size="24px">
                    {{ icon }}
                </v-icon>
            </v-btn>
        </v-card-text>
        <v-row>
            <v-col col="2">

            </v-col>
            <v-col col="8">
                <v-card-text class="gray--text pt-0">

                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus
                </v-card-text>
            </v-col>
            <v-col col="2">

            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-text class="gray--text">
            {{ new Date().getFullYear() }} — <strong>D' Country Store</strong>
        </v-card-text>
    </v-card>
</v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
}
</script>

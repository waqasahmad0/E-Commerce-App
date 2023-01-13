<template>
<v-carousel height="calc(100vh - 64px)" cycle show-arrows-on-hover draggable="false" hide-delimiter-background>
    <v-carousel-item v-for="(item,i) in carouselsData" :key="i" :src="item.src" class="gradient-fill">
        <v-container fill-height>
            <div style="max-width: 600px">
                <div class="text-md-h2 mb-3 text-sm-h3 text-h5 font-weight-black white--text">
                    {{ item.heading.toUpperCase() }}
                </div>
                <p class="mb-5 white--text">{{ item.subHeading }}</p>
                <v-btn :x-large="$vuetify.breakpoint.smAndUp" class="my-3 primary">Get Started</v-btn>
                <span class="mx-2 my-4"></span>
                <v-btn :x-large="$vuetify.breakpoint.smAndUp" text class="my-3" outlined dark>
                    <v-icon left large color="primary">mdi-play</v-icon>Learn
                    More
                </v-btn>
            </div>
        </v-container>
    </v-carousel-item>
</v-carousel>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            carouselsData: [{
                    src: 'https://digital.com/wp-content/uploads/Scoopbyte.com_.jpg',
                    heading: ' Shop WITH US ',
                    subHeading: 'Infographic hypotheses influencer user experience Long madel ture gen-z paradigm shift client partner network product seilans solve management influencer analytics leverage virality. incubator seed round massmarket. buyer agile development growth hacking business-to-consumer ecosystem ',
                },
                {
                    src: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Smartphone_3_1200x768.jpeg?VersionId=nNJ3DkjMxLke2q5NcWNELrAgJ_XXCT28',
                    heading: ' LOREM IPSUM DOLOR SIT AMET CONSEETU',
                    subHeading: 'Litora a interdum primis. Lectus facilisi sit cum arcu aliquam velit imperdiet sapien suspendisse at vel facilisis. Facilisis metus, curae; nibh mi orci et. Fringilla sociis magna rutrum bibendum arcu.',
                },
                {
                    src: 'https://images.priceoye.pk/pakistan-priceoye-slider-h7ecf.jpg',
                    heading: ' Buy Now and pay later ',
                    subHeading: 'Tellus cum turpis natoque id justo interdum tincidunt faucibus aptent congue pellentesque. Proin luctus orci netus! Scelerisque parturient cursus donec parturient et, luctus aptent habitant aliquet felis. Sapien placerat ultricies.',
                },
                {
                    src: 'https://images.priceoye.pk/pakistan-priceoye-slider-1sh6x.png',
                    heading: ' URNA TINCIDUNT MATTIS TORTOR ',
                    subHeading: 'Dapibus cras, ligula suspendisse potenti himenaeos mus volutpat pulvinar est facilisi. Vehicula malesuada parturient euismod litora mollis penatibus. Penatibus cum nullam facilisi enim nisi ac suspendisse. Ullamcorper ad amet netus.',
                },
            ],
        }
    },
}
</script>
<style>
.gradient-fill .v-responsive__content {
  background: linear-gradient(
    to right,
    rgba(59, 59, 5, 0.75),
    rgba(59, 61, 41, 0.65)
  );
}
</style>
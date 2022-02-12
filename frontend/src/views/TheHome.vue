<template>
  <v-app class="home">
    <v-main>
      <the-draw-main />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import TheDrawMain from "@/components/TheDrawMain.vue";

  // import { Post } from '@/interfaces';

  export default Vue.extend({
    name: "Home",
    components: {
      TheDrawMain,
    },
    // data() {
    //   return {
    //     posts: [] as Post[],
    //   }
    // },
  });
</script>

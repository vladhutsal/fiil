<template>
  <v-container>
    <the-draw-main v-if="store.user" />
    <the-login />
  </v-container>
</template>

<script lang="ts">
  import { useStore } from "@/store";
  import { defineComponent } from '@vue/composition-api';

  import TheDrawMain from "@/components/TheDrawMain.vue";
  import TheLogin from "@/components/TheLogin.vue";
  // import { Post } from '@/interfaces';

  export default defineComponent({
    name: "Home",
    components: {
      TheDrawMain,
      TheLogin,
    },

    setup() {
      const store = useStore();
      return { store };
    },
    // data() {
    //   return {
    //     posts: [] as Post[],
    //   }
    // },
  });
</script>

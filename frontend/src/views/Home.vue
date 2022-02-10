<template>
  <v-app class="home">
    <v-main>
      <img alt="Vue logo" src="../assets/logo.png" />
      <the-form :posts="posts"></the-form>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import TheForm from "@/components/TheForm.vue";
  import { BACK_URL } from '@/env';
  import { Post } from '@/interfaces';

  export default Vue.extend({
    name: "Home",
    components: {
      TheForm,
    },
    data() {
      return {
        posts: [] as Post[],
      }
    },
    async created() {
      const response = await fetch(BACK_URL + '/', {
        mode: 'cors',
        method: 'GET',
      });
      this.posts = await response.json();
    }
  });
</script>

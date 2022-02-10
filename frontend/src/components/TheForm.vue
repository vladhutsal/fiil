<template>
  <v-flex>
   <v-card v-for="(post, idx) of posts" :key="idx">
     <p>post.title</p>
     <p>post.datetime</p>
   </v-card>
  </v-flex>
</template>

<script lang="ts">
  import Vue from "vue";
  import { PropType } from "vue"
  import { Post } from '@/interfaces';

  export default Vue.extend({
    name: "TheForm",
    props: {
      posts: {
        type: Array as PropType<Post[]>,
        required: true,
      }
    }
  });
</script>

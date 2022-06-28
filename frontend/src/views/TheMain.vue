<template>
  <v-container>
    <the-draw-main v-if="store.user" />
  </v-container>
</template>

<script lang="ts">
  import { useStore } from "@/store";
  import { defineComponent } from '@vue/composition-api';

  import TheDrawMain from "@/components/TheDrawMain.vue";
  import TheAuth from "@/views/TheAuth.vue";

  export default defineComponent({
    name: "TheMain",
    components: {
      TheDrawMain,
      TheAuth,
    },

    setup() {
      
      const store = useStore();
      return { store };
    },

    created() {
      if (!this.store.user) this.$router.push('/login');
    },
  });
</script>

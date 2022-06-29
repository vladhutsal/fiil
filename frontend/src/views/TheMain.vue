<template>
  <v-container>
    <the-draw-main v-if="userStore.user" />
  </v-container>
</template>

<script lang="ts">
  import useUserStore from '@/store/userStore';
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
      
      const userStore = useUserStore();
      return { userStore };
    },

    created() {
      if (!this.userStore.user) this.$router.push('/login');
    },
  });
</script>

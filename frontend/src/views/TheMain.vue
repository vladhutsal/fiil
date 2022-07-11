<template>
  <v-container>
    <the-draw-main />
  </v-container>
</template>

<script lang="ts">
  import useUserStore from '@/store/user/user.store';
  import { defineComponent } from '@vue/composition-api';

  import TheDrawMain from '@/components/Drawing/TheDrawMain.vue';
  import TheAuth from '@/views/TheAuth.vue';


  export default defineComponent({
    name: 'TheMain',
    components: {
      TheDrawMain,
      TheAuth,
    },

    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
  });
</script>

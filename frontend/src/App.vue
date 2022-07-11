<template>
  <div id="app">
    <v-app>
      <the-navbar />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  import TheNavbar from './components/TheNavbar.vue';

  import { getLocalAuthToken } from './helpers';
  import useUserStore from './store/user/user.store';

  export default defineComponent({
    components: { TheNavbar },
    
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },

    async created() {
      const token = getLocalAuthToken();
      if (token) {
        await this.userStore.actionGetMe(token);
        return;
      }
      if (!['/login', '/register'].includes(this.$route.path)) {
        this.$router.push('/login');
      }
    },
  });
</script>

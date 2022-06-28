<template>
  <v-container>
    <v-tabs-items v-model="store.currentAuthTab">
      <v-tab-item
        :value="'login'"
      >
        <auth-login />
      </v-tab-item>

      <v-tab-item
        :value="'register'"
      >
        <auth-register />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import AuthRegister from '@/components/Auth/AuthRegister.vue';
import AuthLogin from '@/components/Auth/AuthLogin.vue';
import { useStore } from '@/store';
import { defineComponent } from '@vue/composition-api';
import { authTab } from '@/interfaces';

export default defineComponent({
  components: {
    AuthLogin,
    AuthRegister,
  },
  name: 'TheAuth',

  setup() {
    const store = useStore();
    return { store };
  },
  
  created() {
    const authAction = this.$route.path.substring(1);
    this.store.$patch({ currentAuthTab: authAction as authTab });
  },
});
</script>

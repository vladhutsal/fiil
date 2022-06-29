<template>
  <v-container>
    <v-tabs-items v-model="userStore.currentTypeAuthTab">
      <v-tab-item :value="'login'">
        <Authenticate :is-login="true" />
      </v-tab-item>

      <v-tab-item :value="'register'">
        <Authenticate :is-login="false" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import Authenticate from '@/components/Auth/Authenticate.vue';
import { defineComponent } from '@vue/composition-api';
import { TypeAuthTab } from '@/interfaces';
import useUserStore from '@/store/userStore';

export default defineComponent({
  components: { Authenticate },
  name: 'TheAuth',

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  
  created() {
    this.userStore.currentTypeAuthTab = this.$route.path.substring(1) as TypeAuthTab;
  },
});
</script>

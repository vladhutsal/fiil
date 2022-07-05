<template>
  <v-container>
    <v-tabs-items v-model="userStore.currentTypeAuthTab">
      <v-tab-item :value="'login'">
        <AuthForm :is-login="true" />
      </v-tab-item>

      <v-tab-item :value="'register'">
        <AuthForm :is-login="false" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
  import AuthForm from '@/components/Auth/AuthForm.vue';
  import { defineComponent } from '@vue/composition-api';
  import { TypeAuthTab } from '@/interfaces';
  import useUserStore from '@/store/userStore';


  export default defineComponent({
    components: { AuthForm },
    name: 'TheAuth',

    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    
    created() {
      this.userStore.currentTypeAuthTab = this.$route.path.substring(1) as TypeAuthTab;
    },

    // mounted() {
    //   window.addEventListener("keyup", (event) => {
    //     if (event.key === 'Enter') {
    //       this.isLogin ? this.loginUser() : this.registerUser();
    //     }
    //   });

    // },
    

  });
</script>

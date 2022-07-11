<template>
  <v-container>
    <v-tabs-items v-model="currentAuthTab">
      <v-tab-item :value="'login'">
        <AuthForm
          :button-text="'login'"
          :error-msg="responseErrorMsg"
          @submit-action="loginUser"
          @clear-error-on-focus="responseErrorMsg = ''"
        />
      </v-tab-item>

      <v-tab-item :value="'create user'">
        <AuthForm 
          :button-text="'create user'"
          :error-msg="responseErrorMsg"
          @submit-action="registerUser"
          @clear-error-on-focus="responseErrorMsg = ''"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
  import AuthForm from '@/components/Auth/AuthForm.vue';
  import { defineComponent, PropType } from '@vue/composition-api';
  import { TypeAuthTab } from '@/interfaces';
  import useUserStore from '@/store/user/user.store';


  export default defineComponent({
    components: { AuthForm },
    name: 'TheAuth',
    
    // We're getting the currentAuthTab prop from the router path params (router/index.ts)
    props: {
      currentAuthTab: {
        type: String as PropType<TypeAuthTab>,
        required: true,
      }
    },

    setup() {
      const userStore = useUserStore();
      return { userStore };
    },

    data() {
      return {
        currentTypeAuthTab: 'login' as TypeAuthTab,
        responseErrorMsg: '' as string,
      };
    },

    watch: {
      'userStore.loggedIn'(isLogin: string, isLogout: string) {
        if (isLogin) this.$router.push('/');
      }
    },

    methods: {
      async registerUser(userName: string, password: string) {
        await this.userStore.actionRegisterUser({ userName, password });
      },

      async loginUser(userName: string, password: string) {
        await this.userStore.actionLoginUser({ userName, password });
      },
    },

  });
</script>

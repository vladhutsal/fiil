<template>
  <v-app-bar app flat>
    <div v-if="userStore.user" class="d-flex d-row justify-center pa-0" :style="{'minWidth': '100%'}">
      <v-btn
        text
        :ripple="false"
        plain
        to="/"
        class="text-lowercase"
      >
        main
      </v-btn>
      <v-divider vertical />
      <v-btn
        text
        :ripple="false"
        plain
        to="/chat"
        class="text-lowercase"
      >
        chat
      </v-btn>
    </div>

    <div v-else class="d-flex d-row justify-center pa-0" :style="{'minWidth': '100%'}">
      <v-btn
        text
        :ripple="false"
        plain
        to="login"
        class="text-lowercase"
        @click="userStore.currentTypeAuthTab = 'login'"
      >
        login
      </v-btn>
      <v-divider vertical />
      <v-btn
        text
        :ripple="false"
        plain
        to="register"
        class="text-lowercase"
        @click="userStore.currentTypeAuthTab = 'register'"
      >
        register
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
  import useUserStore from "@/store/userStore";
  import { defineComponent } from '@vue/composition-api';


  export default defineComponent({
    name: 'TheNavbar',

    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
  });
</script>
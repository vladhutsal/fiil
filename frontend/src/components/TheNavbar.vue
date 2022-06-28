<template>
  <v-app-bar app flat>
    <div v-if="store.user" class="d-flex d-row justify-center pa-0" :style="{'minWidth': '100%'}">
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
        to="/"
        class="text-lowercase"
      >
        login
      </v-btn>
      <v-divider vertical />
      <v-btn
        text
        :ripple="false"
        plain
        to="/chat"
        class="text-lowercase"
      >
        register
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
  import { useStore } from "@/store";
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent({
    name: 'TheNavbar',

    setup() {
      const store = useStore();
      return { store };
    },
  });
</script>
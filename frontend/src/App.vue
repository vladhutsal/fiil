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
  import Vue from 'vue';
  import TheNavbar from './components/TheNavbar.vue';

  export default Vue.extend({
    components: { TheNavbar },
    
  });
</script>

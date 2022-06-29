<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-card flat>
        <v-card-text class="pb-0">
          <base-text-field
            placeholder="name"
            margin-bottom="mb-4"
          />
          <base-text-field
            placeholder="password"
            margin-bottom="mb-4"
          />
        </v-card-text>

        <v-card-actions class="pt-0 d-flex d-row justify-center">
          <v-btn
            text
            large
            :ripple="false"
            plain
            class="text-lowercase title font-weight-light"
          >
            enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { defineComponent } from '@vue/composition-api';
import BaseTextField from '@/components/Reusable/BaseTextField.vue';

export default defineComponent({
  name: 'AuthLogin',
  components: {
    BaseTextField,
  },

  setup() {
    const store = useStore();
    return { store };
  },
  // data() {
  //   return {
  //     posts: [] as Post[],
  //   }
  // },
});
</script>

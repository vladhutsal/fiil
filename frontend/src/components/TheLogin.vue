<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-card flat>
        <v-card-text class="pb-0">
          <v-text-field
            :style="{'borderRadius': '0px'}"
            dense
            flat
            outlined
            hide-details
            placeholder="name"
            color="grey"
            class="mb-4"
          />
          <v-text-field
            :style="{'borderRadius': '0px'}"
            dense
            flat
            outlined
            hide-details
            placeholder="password"
            color="grey"
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

export default defineComponent({
  name: 'TheLogin',

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

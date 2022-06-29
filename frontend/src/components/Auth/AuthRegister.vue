<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-card flat>
        <v-card-text class="pb-0">
          <base-text-field
            placeholder="name"
            margin-bottom="mb-4"
            :value="name"
            @update:value="newValue => name = newValue"
          />
          <base-text-field
            placeholder="password"
            :value="password"
            @update:value="newValue => password = newValue"
          />
        </v-card-text>

        <v-card-actions class="pt-0 d-flex d-row justify-center">
          <v-btn
            text
            large
            :ripple="false"
            plain
            class="text-lowercase title font-weight-light"
            @click="registerUser"
          >
            create user
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { useStore } from '@/store';
  import { defineComponent } from '@vue/composition-api';
  import BaseTextField from '../Reusable/BaseTextField.vue';

  export default defineComponent({
    components: { BaseTextField },
    name: 'AuthRegister',

    setup() {
      const store = useStore();
      return { store };
    },

    data() {
      return {
        name: '' as string,
        password: '' as string,
      };
    },

    methods: {
      async registerUser() {
        const userData = await this.store.actionRegisterUser({
          name: this.name,
          password: this.password,
        });
        console.log('-- user data', userData);
      },

      logg(event: string) {
        console.log(event);
      },
    },
  });
</script>

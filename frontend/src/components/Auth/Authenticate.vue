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
            @click="isLogin ? loginUser() : registerUser()"
          >
            {{ isLogin ? 'enter' :'create user' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import useUserStore from '@/store/userStore';
  import { defineComponent } from '@vue/composition-api';
  import BaseTextField from '@/components/Reusable/BaseTextField.vue';

  export default defineComponent({
    name: 'Authenticate',
    components: { BaseTextField },

    props: {
      isLogin: { type: Boolean, required: true },
    },

    setup() {
      const userStore = useUserStore();
      return { userStore };
    },

    data() {
      return {
        name: '' as string,
        password: '' as string,
      };
    },

    methods: {
      async registerUser() {
        await this.userStore.actionRegisterUser({
          name: this.name,
          password: this.password,
        });
        if (this.userStore.user) {
          this.$router.push('/');
        }
      },

      async loginUser() {
        await this.userStore.actionRegisterUser({
          name: this.name,
          password: this.password,
        });
        if (this.userStore.user) {
          this.$router.push('/');
        }
      },
    },
  });
</script>

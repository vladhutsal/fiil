<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-form>
        <v-card flat>
          <v-card-text class="pb-0">
            <BaseTextField
              placeholder="name"
              margin-bottom="mb-4"
              :value="name"
              @update:value="newValue => name = newValue"
              @enter-action="isLogin ? loginUser() : registerUser()"
            />
            <BaseTextField
              placeholder="password"
              :value="password"
              @update:value="newValue => password = newValue"
              @enter-action="isLogin ? loginUser() : registerUser()"
            />
          </v-card-text>

          <v-card-actions class="pt-0 d-flex d-row justify-center">
            <v-btn
              text
              large
              :ripple="false"
              plain
              class="text-lowercase title font-weight-light"
              type="button"
              @click="isLogin ? loginUser() : registerUser()"
            >
              {{ isLogin ? 'enter' :'create user' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import useUserStore from '@/store/userStore';
  import { defineComponent } from '@vue/composition-api';
  import BaseTextField from '@/components/Reusable/BaseTextField.vue';

  export default defineComponent({
    name: 'AuthForm',
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
          userName: this.name,
          password: this.password,
        });
        if (this.userStore.user) {
          this.$router.push('/');
        }
      },

      async loginUser() {
        await this.userStore.actionLoginUser({
          userName: this.name,
          password: this.password,
        });
        if (this.userStore.user) {
          this.$router.push('/');
        }
      },
    },

  });
</script>

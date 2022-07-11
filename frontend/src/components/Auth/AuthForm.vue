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
              @focus="$emit('clear-error-on-focus')"
              @update:value="newValue => name = newValue"
              @enter-action="emitFieldsData"
            />
            <BaseTextField
              placeholder="password"
              :value="password"
              @focus="$emit('clear-error-on-focus')"
              @update:value="newValue => password = newValue"
              @enter-action="emitFieldsData"
            />
          </v-card-text>

          <v-card-actions class="py-0 d-flex d-row justify-center">
            <v-btn
              text
              :ripple="false"
              plain
              class="text-lowercase title font-weight-light"
              type="button"
              @click="emitFieldsData"
            >
              {{ buttonText }}
            </v-btn>
          </v-card-actions>

          <div class="d-flex d-row justify-center">
            <p class="red--text text-caption mb-0">{{ errorMsg }}</p>
          </div>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import useUserStore from '@/store/user/user.store';
  import { defineComponent } from '@vue/composition-api';
  import BaseTextField from '@/components/Reusable/BaseTextField.vue';

  export default defineComponent({
    name: 'AuthForm',
    components: { BaseTextField },

    props: {
      buttonText: { type: String, required: true },
      errorMsg: { type: String, required: true },
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
      emitFieldsData() {
        if (this.name && this.password) {
          this.$emit('submit-action', this.name, this.password);
        }
      }
    }
  });
</script>

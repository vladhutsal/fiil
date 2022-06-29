<template>
  <v-text-field
    :style="{ borderRadius: '0px' }"
    dense
    flat
    outlined
    hide-details
    :placeholder="placeholder"
    :color="color"
    :class="marginBottom"
    :value="value"
    @input="$emit('update:value', $event)"
  />
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent({
    name: 'BaseTextField',

    props: {
      value: { type: String, required: true },
      placeholder: { type: String, required: true },
      color: { type: String, default: 'grey' },
      marginBottom: { type: String, default: '' },
    },

    emits: [ 'update:value' ],

  });
</script>

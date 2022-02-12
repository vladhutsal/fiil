import { defineStore } from 'pinia';
import actions from '@/store/actions';
import state from '@/store/state';

export const useStore = defineStore('main', {
  state,
  actions,
});

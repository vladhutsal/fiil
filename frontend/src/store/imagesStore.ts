import axios from 'axios';
import { defineStore } from 'pinia';

import useUserStore from './userStore';

import { API_URL } from '@/env';
import { getAuthHeader } from '@/helpers';
import { IStoreImages, IResponse, IImages } from '@/interfaces';
import { getCurrentUserToken } from './storeHelpers';

const useImagesStore = defineStore('images', {
  state: (): IStoreImages => ({
    userCanvas: [],
    loadingImages: false,
  }),

  actions: {
    async actionUploadImage(canvasData: string): Promise<void> {
      try {
        const token = getCurrentUserToken();
        await axios.post(`${API_URL}/upload-png`, canvasData, getAuthHeader(token));

      } catch (err) {
        console.log(err);
      }
    },

    async actionFetchAllImages(): Promise<IImages | void> {
      try {
        const token = getCurrentUserToken();
        const resp = await axios.get<IResponse<IImages>>(`${API_URL}/get-all-png`, getAuthHeader(token));
        const data = resp.data;
        if (data.error) throw data.error;
        if (data) return data.payload;

      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default useImagesStore;

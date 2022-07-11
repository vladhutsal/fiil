import { defineStore } from 'pinia';

import { IStoreImages, IImagesPublic } from '@/interfaces';
import imagesApi from '@/api/images.api';
import userStoreHelpers from '../user/user.store.helpers';

const useImagesStore = defineStore('images', {
  state: (): IStoreImages => ({
    userCanvas: [],
    loadingImages: false,
  }),

  actions: {
    async actionUploadImage(canvasData: string): Promise<void> {
      try {
        const token = userStoreHelpers.getUserToken();
        await imagesApi.uploadImage(canvasData, token);

      } catch (err) {
        console.log(err);
      }
    },

    async actionFetchAllImages(): Promise<IImagesPublic | void> {
      try {
        const token = userStoreHelpers.getUserToken();
        const resp = await imagesApi.fetchAllImages(token);

        if (resp.data.error) throw resp.data.error;
        if (resp.data) return resp.data.payload;

      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default useImagesStore;

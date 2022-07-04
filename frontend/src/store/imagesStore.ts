import { defineStore } from 'pinia';
import { IStoreImages, IResponse, IImages } from '@/interfaces';
import { BACK_URL } from '@/env';

const useImagesStore = defineStore('images', {
  state: (): IStoreImages => ({
    userCanvas: [],
    loadingImages: false,
  }),

  actions: {
    async actionUploadPng(canvasData: string): Promise<boolean> {
      try {
        const resp = await fetch(BACK_URL + '/upload-png', {
          method: 'POST',
          body: canvasData,
        });
        return resp.ok;
      } catch (err) {
        console.log(err);
        return false;
      }
    },

    async actionLoadAllPng(): Promise<IImages | void> {
      try {
        const resp = await fetch(BACK_URL + '/get-all-png');
        const data: IResponse<IImages> = await resp.json();
        if (data.error) throw data.error;
        if (data) return data.payload;

      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default useImagesStore;

import { defineStore } from 'pinia';
import { IImagesStore, IResponse, IUser, IUserRegister } from '@/interfaces';
import { BACK_URL } from '@/env';

const useImagesStore = defineStore('images', {
  state: (): IImagesStore => ({
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

    async actionLoadAllPng(): Promise<string[] | void> {
      try {
        const resp = await fetch(BACK_URL + '/get-all-png', {
          method: 'GET',
        });
        const data: IResponse<string[]> = await resp.json();
        if (data.error) throw data.error;
        if (data) return data.payload;

      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default useImagesStore;

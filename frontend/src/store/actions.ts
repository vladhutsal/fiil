import { BACK_URL } from '@/env';
import { compileUnit8Array } from '@/helpers';


const actions = {
  async uploadPng(canvasData: string): Promise<boolean> {
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

  async loadAllPng(): Promise<string[] | undefined> {
    try {
      const resp = await fetch(BACK_URL + '/get-all-png', {
        method: 'GET',
      });
      const data = await resp.json().then(data => data as {data: string[]});
      return data.data;
    } catch (err) {
      console.log(err);
    }
  }
};

export default actions;

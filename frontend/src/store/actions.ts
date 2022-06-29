import { BACK_URL } from '@/env';
import { IUser, IUserRegister } from '@/interfaces';


const actions = {
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

  async actionLoadAllPng(): Promise<string[] | undefined> {
    try {
      const resp = await fetch(BACK_URL + '/get-all-png', {
        method: 'GET',
      });
      const data: string[] = await resp.json();
      if (data) return data;

    } catch (err) {
      console.log(err);
    }
  },

  async actionRegisterUser(userData: IUserRegister): Promise<IUser | void> {
    try {
      const resp = await fetch(BACK_URL + '/register-user', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data: IUser = await resp.json();
      if (!data) throw 'Empty response, user was not registerd';
      return data;

    } catch (err) {
      console.log(err);
    }
  },
};

export default actions;

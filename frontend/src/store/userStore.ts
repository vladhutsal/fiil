import { defineStore } from 'pinia';
import { IStoreUser, IUser, IUserAuth, IResponse } from '@/interfaces';
import { BACK_URL } from '@/env';

const useUserStore = defineStore('user', {
  state: (): IStoreUser => ({
    user:  undefined,
    currentTypeAuthTab: 'login',
  }),

  actions: {
    async actionRegisterUser(userData: IUserAuth): Promise<void> {
      try {
        const resp = await fetch(BACK_URL + '/register', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: { 'Content-Type': 'application/json' },
        });

        const data: IResponse<IUser | void> = await resp.json();
        if (!data) throw 'empty response, user was not created';
        if (data.error) throw data.error;

      } catch (err) {
        console.log(err);
      }
    },

    async actionLoginUser(userData: IUserAuth): Promise<void> {
      try {
        const resp = await fetch(BACK_URL + '/login', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: { 'Content-Type': 'application/json' },
        });

        const data: IResponse<IUser> = await resp.json();
        if (!data) throw 'empty response, user was not created';
        if (data.error) throw data.error;

        this.user = data.payload;

      } catch (err) {
        console.log(err);
      }
      
    }
  },
});

export default useUserStore;

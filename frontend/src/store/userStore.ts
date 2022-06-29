import { defineStore } from 'pinia';
import { IUserStore, IUser, IUserRegister, IResponse } from '@/interfaces';
import { BACK_URL } from '@/env';

const useUserStore = defineStore('main', {
  state: (): IUserStore => ({
    user: undefined,
    currentTypeAuthTab: 'login',
  }),

  actions: {
    async actionRegisterUser(userData: IUserRegister): Promise<void> {
      try {
        const resp = await fetch(BACK_URL + '/register-user', {
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
    },
  },
});

export default useUserStore;

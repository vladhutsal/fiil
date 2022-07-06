import { defineStore } from 'pinia';
import { IStoreUser, IUser, IUserAuth, IResponse } from '@/interfaces';
import { API_URL } from '@/env';
import { getAuthToken, saveAuthToken } from '@/helpers';
import axios from 'axios';

const anonymousUser: IUser = {
  userName: 'anon',
  token: '',
  created: '',
};

const useUserStore = defineStore('user', {
  state: (): IStoreUser => ({
    user: anonymousUser,
    loggedIn: false,
    currentTypeAuthTab: 'login',
  }),

  actions: {
    async actionRegisterUser(userData: IUserAuth): Promise<void> {
      try {
        const resp = await axios.post<IResponse<IUser>>(`${API_URL}/auth/register`, userData);
        const data = resp.data; 
        if (!data) throw 'empty response, user was not created';
        if (data.error) throw data.error;

      } catch (err) {
        console.log(err);
      }
    },

    async actionLoginUser(userData: IUserAuth): Promise<void> {
      try {
        const resp = await axios.post<IResponse<IUser>>(`${API_URL}/auth/login`, userData);
        const data = resp.data;
        if (!data) throw 'empty response, user was not created';
        if (data.error) throw data.error;
        
        const payload = data.payload;
        if (payload && payload.token) {
          this.user = payload;
          saveAuthToken(payload.token);
          this.loggedIn = true;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async actionGetMe(): Promise<void> {
      const resp = await axios.post<IResponse<IUser>>(`${API_URL}/user/getMe`, getAuthToken());
      const data = resp.data;
  
      if (!data) throw 'empty response';
      if (data.error) throw data.error;
    }
  },
});

export default useUserStore;

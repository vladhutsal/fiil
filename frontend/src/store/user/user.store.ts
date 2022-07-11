import { defineStore } from 'pinia';
import { IStoreUser, IUserPublic, IUserAuth } from '@/interfaces';
import { getLocalAuthToken, saveLocalAuthToken, removeLocalAuthToken } from '@/helpers';
import userApi from '@/api/user.api';
import router from '@/router';


const anonymousUser: IUserPublic = {
  userName: '',
  created: '',
};

const useUserStore = defineStore('user', {
  state: (): IStoreUser => ({
    token: '',
    user: anonymousUser,
    loggedIn: false,
  }),

  actions: {
    // Returns errors string (if some) to show it as the Auth component error message
    async actionRegisterUser(userData: IUserAuth): Promise<void | string> {
      try {
        const resp = await userApi.registerUser(userData);
        if (!resp.data) throw 'no user';
        if (resp.data.error) throw resp.data.error;
        
        const payload = resp.data.payload;
        if (!payload || !payload.token) throw 'register: user was not created';
        saveLocalAuthToken(payload.token);
        
        await this.actionGetMe(payload.token);

      } catch (err) {
        return err as string;
      }
    },

    // Returns errors string (if some) to show it as the Auth component error message
    async actionLoginUser(userData: IUserAuth): Promise<void | string> {
      try {
        const resp = await userApi.loginUser(userData);
        if (!resp.data) throw 'no user';
        if (resp.data.error) throw resp.data.error;
        
        const payload = resp.data.payload;
        if (!payload || !payload.token) throw 'login: can not login';
        saveLocalAuthToken(payload.token);

        await this.actionGetMe(payload.token);

      } catch (err) {
        return err as string;
      }
    },

    async actionGetMe(token: string): Promise<IUserPublic | void> {
      try {
        const resp = await userApi.getMe(token);
        if (!resp.data) throw 'get user: empty response';
        if (resp.data.error) throw resp.data.error;

        const user = resp.data.payload;
        if (!user) throw 'login: user not found';
        this.$patch({ user: user });
        this.$patch({ loggedIn: true });

      } catch (err) {
        console.log(err);
        this.actionRemoveTokenAndLogout();
      }
    },

    async actionInitVisitor(): Promise<void> {
      // TODO: handle broken token
      
    },

    actionRemoveTokenAndLogout() {
      removeLocalAuthToken();
      this.$patch({ loggedIn: false });
      this.$patch({ user: anonymousUser });
      router.push('/login');
    },
  },

  getters: {
    getCurrentUserToken(): string {
      if (this.token) return this.token;

      const localStorageToken = getLocalAuthToken();
      if (localStorageToken) return localStorageToken;

      throw 'userStore: something wrong with authorization';
      // TODO: logout if no token?
    }
  },
});

export default useUserStore;

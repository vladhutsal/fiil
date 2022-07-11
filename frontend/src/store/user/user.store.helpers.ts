import useUserStore from './user.store';

const userStoreHelpers = {
  getUserToken: function (): string {
    const userStore = useUserStore();
    return userStore.getCurrentUserToken;
  }
};

export default userStoreHelpers;

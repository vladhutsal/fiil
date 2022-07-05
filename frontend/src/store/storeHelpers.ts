import useUserStore from './userStore';

export const getCurrentUserToken = (): string => {
  const userStore = useUserStore();
  const token = userStore.user.token;
  if (!token) throw 'not authorized';
  return token;
};
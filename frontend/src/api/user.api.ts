import { API_URL } from '@/env';
import { getAuthHeader } from '@/helpers';
import { IResponse, IUserPublic, IUserAuth, ITokenPublic, TypeAxiosResponse } from '@/interfaces';
import axios from 'axios';


const userApi = {
  registerUser: async (userData: IUserAuth): TypeAxiosResponse<ITokenPublic> => {
    return await axios.post(`${API_URL}/auth/register`, userData);
  },

  loginUser: async (userData: IUserAuth): TypeAxiosResponse<ITokenPublic> => {
    return await axios.post(`${API_URL}/auth/login`, userData);
  },

  getMe: async (token: string): TypeAxiosResponse<IUserPublic> => {
    const authHeader = getAuthHeader(token);
    return await axios.get<IResponse<IUserPublic>>(`${API_URL}/user/get-me`, authHeader);
  },
};

export default userApi;
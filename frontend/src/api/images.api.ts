import { API_URL } from '@/env';
import { getAuthHeader } from '@/helpers';
import { IResponse, ITokenPublic, TypeAxiosResponse, IImagesPublic } from '@/interfaces';
import axios from 'axios';


const imagesApi = {
  uploadImage: async (canvasData: string, token: string): TypeAxiosResponse<ITokenPublic> => {
    const authHeader = getAuthHeader(token);
    authHeader.headers['Content-Type'] = 'text/plain';
    return await axios.post(`${API_URL}/upload-png`, canvasData, authHeader);
  },

  fetchAllImages: async (token: string): TypeAxiosResponse<IImagesPublic> => {
    const authHeader = getAuthHeader(token);
    return await axios.get<IResponse<IImagesPublic>>(`${API_URL}/get-all-png`, authHeader);
  },
};

export default imagesApi;
import { AxiosResponse } from 'axios';

export type TypeAuthTab = 'login' | 'register';
export type TypeAxiosResponse<D> = Promise<AxiosResponse<IResponse<D>>>;
export type TypeRequestHeaders = { 
  headers: { 
    Authorization: string,
    'Content-Type'?: string, 
  }
};

// Pinia stores. Good idea to split them?
export interface IStoreImages {
  userCanvas: string[];
  loadingImages: boolean;
}

export interface IStoreUser {
  token: string;
  user: IUserPublic;
  loggedIn: boolean;
}


export interface IUserPublic {
  userName: string;
  created: string;
}

export interface IImagesPublic {
  images: string[];
  count: number;
}

export interface ITokenPublic {
  token: string;
}

export interface IUserAuth {
  userName: string;
  password: string;
}



export interface ILinePoints {
  x: number;
  y: number;
}

export interface IResponse<ResponseDataT> {
  payload?: ResponseDataT;
  error?: string;
}

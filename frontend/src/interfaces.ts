export type TypeAuthTab = 'login' | 'register';

// Pinia stores. Good idea to split them?
export interface IStoreImages {
  userCanvas: string[];
  loadingImages: boolean;
}

export interface IStoreUser {
  user: IUser | undefined;
  currentTypeAuthTab: TypeAuthTab;
}


export interface IUser {
  token: string;
  userName: string;
  created: string;
}

export interface IUserAuth {
  userName: string;
  password: string;
}


export interface ILinePoints {
  x: number;
  y: number;
}

export interface IImages {
  images: string[];
  count: number;
}

export interface IResponse<ResponseDataT> {
  payload?: ResponseDataT;
  error?: string;
}

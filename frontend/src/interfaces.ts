export type TypeAuthTab = 'login' | 'register';

// Pinia stores. Good idea to split them?
export interface IImagesStore {
  userCanvas: string[];
  loadingImages: boolean;
}

export interface IUserStore {
  user: IUser | undefined;
  currentTypeAuthTab: TypeAuthTab;
}


export interface IUser {
  name: string;
}

export interface IUserRegister extends IUser {
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

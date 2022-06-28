export type authTab = 'login' | 'register';

export interface IState {
  user: boolean;
  userCanvas: string[];
  loadingImages: boolean;
  currentAuthTab: authTab;
}

export interface IUserLine {
  x: number;
  y: number;
}

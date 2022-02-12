import { IState } from "@/interfaces";

const state = (): IState => {
  return {
    user: undefined,
    userCanvas: [],
    loadingImages: false,
  };
};

export default state;

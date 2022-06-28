import { IState } from "@/interfaces";

const state = (): IState => {
  return {
    user: false,
    userCanvas: [],
    loadingImages: false,
  };
};

export default state;

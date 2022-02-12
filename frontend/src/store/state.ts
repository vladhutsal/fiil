import { IState } from "@/interfaces";

const state = (): IState => {
  return {
    user: undefined,
    userCanvas: [],
  };
};

export default state;

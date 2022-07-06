import { Status, Response as OakResponse } from '../deps.ts';

export const throwError = (response: OakResponse, errorMsg?: string): void => {
  response.type = 'application/json';
  response.body = { error: errorMsg || `unknown error ${Status.InternalServerError}` };
};

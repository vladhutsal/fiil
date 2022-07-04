import { genSalt, hash, Status, Response as OakResponse } from "../deps.ts";


// Auth helpers
export const getPasswordHash = async (pass: string): Promise<string> => {
  const salt = await genSalt(8);
  console.log('salt', salt)
  return hash(pass, salt);
};

export const throwError = (response: OakResponse, errorMsg?: string): void => {
  response.type = "application/json";
  response.body = { error: errorMsg || `unknown error ${Status.InternalServerError}` };
}

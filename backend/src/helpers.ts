import { JWTExpirationTime } from "./config.ts";

import { bcryptGenSalt, bcryptHash, Bson, createJWT } from './deps.ts';
import { Status, Response as OakResponse } from './deps.ts';
import { Header, Payload } from './deps.ts';

// Auth helpers
export const getPasswordHash = async (pass: string): Promise<string> => {
  const salt = await bcryptGenSalt(8);
  return bcryptHash(pass, salt);
};

const JWTSecret = await crypto.subtle.generateKey( 
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  ['sign', 'verify'],
);

export const getJWTToken = async (userId: Bson.ObjectId): Promise<string> => {
  const now = Date.now();

  const header: Header = {
    'alg': 'HS512',
    'typ': 'JWT',
  };
  
  const payload: Payload = {
    'iss': 'fiil',
    'sub': 'auth',
    'exp': now + JWTExpirationTime,
    'iat': now,
    'uid': userId.toString(),
  };

  return await createJWT(header, payload, JWTSecret)
};

export const throwError = (response: OakResponse, errorMsg?: string): void => {
  response.type = 'application/json';
  response.body = { error: errorMsg || `unknown error ${Status.InternalServerError}` };
};

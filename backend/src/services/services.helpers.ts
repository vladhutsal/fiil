import { Header, Bson } from '../deps.ts';
import { bcryptGenSalt, bcryptHash } from '../deps.ts';
import { createJWT, verifyJWT } from '../deps.ts';
import { tokenSecret } from '../config.ts';

import CRUD from "../db/crud.ts";
import { JWTExpirationTime } from "../config.ts";

import { IJwtPayload } from "../types/interfaces.ts";
import { JwtTokenSchema } from "../types/schemas.ts";

const getJwtSecret = async (secret: string) => {
  const enc = new TextEncoder();
  const bKey = enc.encode(secret);
  const hmacParams = {
    name: "HMAC",
    hash: { name: "SHA-512" },
  };
  return await crypto.subtle.importKey('raw', bKey, hmacParams, true, ['sign', 'verify']);
}

const JWTSecret = await getJwtSecret(tokenSecret!);


export const verifyAndGetJwtPayload = async (token: string): Promise<IJwtPayload | void> => {
  try {
    return await verifyJWT(token, JWTSecret) as IJwtPayload;
  } catch (err) {
    console.log('JWT: could not verify token', err)
    return;
  }
}

export const createUserJwtToken = async (userId: Bson.ObjectId): Promise<string> => {
  const token: JwtTokenSchema = {
    _id: new Bson.ObjectId(),
    userId: userId,
    token: await generateJwtToken(userId),
    created: new Date().toUTCString(),
  }
  await CRUD.insertToken(token);

  return token.token;
}

const generateJwtToken = async (userId: Bson.ObjectId): Promise<string> => {
  const now = Date.now();
  const header: Header = { 'alg': 'HS512', 'typ': 'JWT' };
  const payload: IJwtPayload = {
    'iss': 'fiil',
    'sub': 'auth',
    'exp': now + JWTExpirationTime,
    'iat': now,
    'uid': userId.toString(),
  };

  return await createJWT(header, payload, JWTSecret)
};


export const getPasswordHash = async (pass: string): Promise<string> => {
  const salt = await bcryptGenSalt(8);
  return bcryptHash(pass, salt);
};



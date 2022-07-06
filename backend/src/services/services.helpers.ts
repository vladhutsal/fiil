import { JWTExpirationTime } from "../config.ts";
import CRUD from "../db/crud.ts";
import { bcryptGenSalt, bcryptHash, Bson, createJWT, verifyJWT } from '../deps.ts';
import { Header } from '../deps.ts';
import { IJwtPayload } from "../types/interfaces.ts";
import { JwtTokenSchema } from "../types/schemas.ts";

export const getTokenPayload = async (token: string): Promise<IJwtPayload> => {
  return await verifyJWT(token, JWTSecret) as IJwtPayload;
}

export const createUserJwtToken = async (userId: Bson.ObjectId): Promise<string> => {
  console.log('--- user id', userId);

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

const JWTSecret = await crypto.subtle.generateKey( 
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  ['sign', 'verify'],
);




export const getPasswordHash = async (pass: string): Promise<string> => {
  const salt = await bcryptGenSalt(8);
  return bcryptHash(pass, salt);
};



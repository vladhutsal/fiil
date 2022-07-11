import "https://deno.land/x/dotenv@v3.2.0/load.ts";
// import { envConf } from "./deps.ts";

export const API_URL =  "/api";
export const IMG_DIR_PATH = "/backend/images/";
export const MONGO_URL = "mongodb://mongodb:27017";
export const APP_DB_NAME = "fill";

export const JWTExpirationTime = 3000000; // ~ month

export const tokenSecret = Deno.env.get('JWT_TOKEN_SECRET');
if (!tokenSecret) throw 'JWT: no secret set in .env'

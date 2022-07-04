export { decode, encode } from "https://deno.land/std@0.125.0/encoding/base64.ts";
export {
    create as createJWT,
    decode as decodeJWT,
    verify as verifyJWT 
} from "https://deno.land/x/djwt@v2.7/mod.ts";

export { compare, genSalt, hash } from "https://deno.land/x/bcrypt@v0.4.0/mod.ts";

export type { RouterContext, State, Response } from "https://deno.land/x/oak@v10.2.0/mod.ts";
export { Application, Router, Status } from "https://deno.land/x/oak@v10.2.0/mod.ts"
export { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

export { Bson, MongoClient, Collection, Database } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
export { ObjectId } from "https://deno.land/x/web_bson@v0.1.6/mod.ts";

export { config as envConf } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";
export { logger };

// might use:
// export { timeAgo } from "https://deno.land/x/time_ago@v1/mod.ts";

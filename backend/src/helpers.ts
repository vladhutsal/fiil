import { envConf } from './deps.ts';
import { ISecretsDotEnv } from "./interfaces.ts";
import { SECRETS_NAMES, SECRETS_PATH } from "../env/env.ts";

export function validateAndGetSecrets(): ISecretsDotEnv {
  envConf({ export: true, path: SECRETS_PATH });

  // const emptySecrets: [string, undefined][] = SECRETS_NAMES.map((name) => [name, undefined]);
  // const secrets: ISecretsDotEnv = Object.fromEntries(emptySecrets);

  SECRETS_NAMES.forEach((secretName) => {
    const secretVal = Deno.env.get(secretName);
    if (!secretVal) throw new Error(`Check your ${secretName} value in .secrets.env`);

    // if (secretVal) secrets[secretName] = secretVal;
    // else throw new Error(`Check your ${secretName} value in .secrets.env`);
  });

  return {
    MONGO_NAME: Deno.env.get("MONGO_NAME") as string,
    MONGO_PASS: Deno.env.get("MONGO_PASS") as string,
    MONGO_DB: Deno.env.get("MONGO_DB_NAME") as string,
    MONGO_CLUSTER: Deno.env.get("MONGO_CLUSTER") as string,
  };
}

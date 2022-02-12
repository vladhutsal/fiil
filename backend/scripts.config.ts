import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run src/main.ts",
      desc: "Run fiil backend",
      allow: ['env', 'net', 'read', 'write'],
      "log": "info"
    },
  },
};

export default config;

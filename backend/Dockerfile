FROM denoland/deno:1.18.2
WORKDIR /backend

RUN deno install -qAf --unstable https://deno.land/x/denon@2.5.0/denon.ts

COPY src/deps.ts ./src/
RUN deno cache --reload src/deps.ts

ADD . .
RUN deno cache src/main.ts

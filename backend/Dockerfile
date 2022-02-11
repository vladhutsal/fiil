FROM denoland/deno:1.18.2
WORKDIR /backend

# install deno deps works only with root user
RUN deno install -qAf --unstable https://deno.land/x/denon@2.5.0/denon.ts

# USER deno

COPY src/deps.ts ./src/
RUN deno cache src/deps.ts

ADD . .
RUN deno cache src/main.ts

# CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]

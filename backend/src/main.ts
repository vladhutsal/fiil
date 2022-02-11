import { Application } from "./deps.ts";
import { allowCors } from './deps.ts';
import { router } from './router.ts';

const app = new Application();

app.use(allowCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.info("CORS-enabled web server listening on http://localhost:8000");
app.listen({ port: 8000 });

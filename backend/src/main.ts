import { Application } from "./deps.ts";
import { allowCors } from './deps.ts';
import { router } from './api.ts';

const app = new Application();

app.use(allowCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.info("Web server listening on http://localhost:8000");
app.listen({ port: 8000 });

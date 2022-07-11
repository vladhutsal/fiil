import { Application, logger, oakCors } from './deps.ts';
import router from './api/index.ts';
import { IRouterState } from './types/interfaces.ts';

const app = new Application<IRouterState>();

app.use(oakCors({
  // origin: 'http://192.168.0.113:8080/',
  origin: [
    /^.+localhost.+/,
    /^.+[\d+|.]/,
    'http://192.168.0.113:8080/',
     /^.+[\d+|.]:8080\/?/,
     '*',
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(logger.logger);
app.use(logger.responseTime);

app.use(router.routes());
app.use(router.allowedMethods());

console.info("Web server listening on http://localhost:8000");
app.listen({ port: 8000 });

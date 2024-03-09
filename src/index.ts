import { migrate } from 'drizzle-orm/mysql2/migrator';
import env from './config/env';
import { buildServer } from './utils/server';
import db from './db';

const startServer = async () => {
  const app = await buildServer();

  try {
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          app.close().then(err => {
            console.log(`close application on ${signal}`);
            process.exit(err ? 1 : 0);
          }),
        );
      }
    }
    await app.listen({ port: env.API_PORT, host: env.API_HOST });
    await migrate(db, {
      migrationsFolder: './migrations',
    });
    return app;
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

process.on('unhandledRejection', e => {
  console.error(e);
  process.exit(1);
});

export const fastifyApp = startServer();

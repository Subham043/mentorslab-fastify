import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import bcrypt from 'fastify-bcrypt';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import { logger } from './logger';
import { corsOptions } from '../constants/corsOptions';
import { helmetOptions } from '../constants/helmetOptions';
import { userRoutes } from '../modules/user/user.routes';

export async function buildServer() {
  const server = await fastify({
    logger: logger,
    disableRequestLogging: true,
    ajv: {
      customOptions: {
        allErrors: true,
      },
      plugins: [require('ajv-errors')],
    },
  });

  server.setErrorHandler((error, request, reply) => {
    if (error.validation && error.statusCode === 400) {
      const result = {};
      error.validation.forEach(element => {
        result[
          (element.params.missingProperty as string) ||
            (element.params.format as string) ||
            (element.instancePath.replace('/', '') as string)
        ] = element.message;
      });
      reply.status(422).type('application/json').send({
        statusCode: 422,
        success: false,
        message: 'Bad Request',
        errors: result,
      });
      return;
    }
    reply
      .status(error.statusCode || 500)
      .type('application/json')
      .send({ ...error, success: false });
    return;
  });

  await server.register(fastifyRequestLogger);

  await server.register(cors, corsOptions);

  await server.register(helmet, helmetOptions);

  await server.register(bcrypt, {
    saltWorkFactor: 12,
  });

  await server.register(userRoutes, { prefix: '/api/users' });

  await server.ready();

  return server;
}

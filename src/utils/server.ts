import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import bcrypt from 'fastify-bcrypt';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import auth from '@fastify/auth';
import mailer from 'fastify-mailer';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import { logger } from './logger';
import { corsOptions } from '../constants/corsOptions';
import { helmetOptions } from '../constants/helmetOptions';
import { userRoutes } from '../modules/user/user.routes';
import { mailOptions } from '../constants/mailOptions';
import { FastifyMailType } from '../@types/mail.type';
import { authRoutes } from '../modules/auth/auth.routes';
import env from '../config/env';
import { PreHandlerHookDecoratorType, ServerErrorHandler, verifyJwtDecorator } from './decorator';
import { UserType } from '../@types/user.type';

declare module 'fastify' {
  interface FastifyInstance {
    mailer: FastifyMailType;
    verifyJwt: PreHandlerHookDecoratorType;
  }
  interface FastifyRequest {
    authenticatedUser: UserType | undefined;
  }
}

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

  server.setErrorHandler((error, request, reply) => ServerErrorHandler(error, request, reply));

  await server.register(fastifyRequestLogger);

  await server.register(jwt, {
    secret: env.JWT_KEY,
  });

  await server.register(cookie, {
    secret: env.JWT_KEY,
  });

  await server
    .decorate('verifyJwt', (request: FastifyRequest, reply: FastifyReply, done) =>
      verifyJwtDecorator(request, reply, done),
    )
    .register(auth);

  await server.register(mailer, mailOptions);

  await server.register(cors, corsOptions);

  await server.register(helmet, helmetOptions);

  await server.register(bcrypt, {
    saltWorkFactor: 12,
  });

  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(userRoutes, { prefix: '/api/users' });

  await server.ready();

  return server;
}

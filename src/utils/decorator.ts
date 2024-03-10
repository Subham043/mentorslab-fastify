import {
  FastifyBaseLogger,
  FastifyError,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProviderDefault,
  RawServerDefault,
  preHandlerHookHandler,
} from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { CustomUnauthorizedError } from './exceptions';
import { UserType } from '../@types/user.type';

export type PreHandlerHookDecoratorType = preHandlerHookHandler<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  unknown,
  FastifySchema,
  FastifyTypeProviderDefault,
  FastifyBaseLogger
>;

export const ServerErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error.validation && error.statusCode === 400) {
    const result = {};
    error.validation.forEach(element => {
      result[
        (element.params.missingProperty as string) ||
          (element.params.format as string) ||
          (element.instancePath.replace('/', '') as string)
      ] = element.message;
    });
    return reply.status(422).type('application/json').send({
      statusCode: 422,
      success: false,
      message: 'Bad Request',
      errors: result,
    });
  }
  return reply
    .status(error.statusCode || 500)
    .type('application/json')
    .send({ ...error, success: false });
};

export const verifyJwtDecorator = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: FastifyError) => void,
) => {
  try {
    const authHeader = request.headers.authorization ?? undefined;
    const authCookie = request.cookies.access_token ?? undefined;
    if (authHeader || authCookie) {
      const token = authCookie || authHeader.replace('Bearer ', '');
      const user = request.server.jwt.verify(token) as UserType;
      if (user) {
        request.user = user;
        request.authenticatedUser = user;
        return done(); // pass an error if the authentication fails
      } else {
        throw new CustomUnauthorizedError();
      }
    } else {
      throw new CustomUnauthorizedError();
    }
  } catch (err) {
    throw new CustomUnauthorizedError();
  }
};

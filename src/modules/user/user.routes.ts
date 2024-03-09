import { FastifyInstance } from 'fastify';
import { createUser, listUsers } from './user.controller';
import { createUserJsonSchema } from './user.schemas';

export async function userRoutes(app: FastifyInstance) {
  app.get('/', {}, listUsers);
  app.post('/', { schema: createUserJsonSchema }, createUser);
}

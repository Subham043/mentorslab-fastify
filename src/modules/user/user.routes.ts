import { FastifyInstance } from 'fastify';
import { createUser, getUser, listUsers, removeUser, updateUser } from './user.controller';
import { getUserJsonSchema } from './schemas/id_param.schema';
import { createUserJsonSchema } from './schemas/create.schema';
import { updateUserJsonSchema } from './schemas/update.schema';
import { getUserQueryJsonSchema } from './schemas/pagination_query.schema';

export async function userRoutes(app: FastifyInstance) {
  app.get('/', { schema: getUserQueryJsonSchema, preHandler: app.verifyJwt }, listUsers);
  app.get('/:id', { schema: getUserJsonSchema, preHandler: app.verifyJwt }, getUser);
  app.post('/', { schema: createUserJsonSchema, preHandler: app.verifyJwt }, createUser);
  app.put('/:id', { schema: updateUserJsonSchema, preHandler: app.verifyJwt }, updateUser);
  app.delete('/:id', { schema: getUserJsonSchema, preHandler: app.verifyJwt }, removeUser);
}

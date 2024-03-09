import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserBody } from './user.schemas';
import { create } from './user.services';

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  reply.code(200).send({
    code: 200,
    success: true,
    message: 'Hello World',
  });
}

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  reply.code(200).send({
    code: 200,
    success: true,
    message: 'Hello World',
  });
}

export async function createUser(
  request: FastifyRequest<{
    Body: CreateUserBody;
  }>,
  reply: FastifyReply,
) {
  const result = await create(request.body);
  reply.code(201).send({
    code: 201,
    success: true,
    message: 'User Created',
    data: result,
  });
  // try {
  // } catch (error) {
  //   if (error) {
  //     console.log(error);
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     // const err = new Error('hello') as any;
  //     // err.statusCode = 422;
  //     // err.myCustomError = 'yo yo I am custom';
  //     // throw err;
  //   }
  //   throw error;
  // }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  reply.code(200).send({
    code: 200,
    success: true,
    message: 'Hello World',
  });
}

export async function removeUser(request: FastifyRequest, reply: FastifyReply) {
  reply.code(200).send({
    code: 200,
    success: true,
    message: 'Hello World',
  });
}

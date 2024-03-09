import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const createUserBodySchema = z.object({
  name: z
    .string({
      errorMap: () => ({ message: 'Name must be a string' }),
    })
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(256, { message: 'Name must be less than 256 characters' })
    .trim(),
  email: z
    .string({
      errorMap: () => ({ message: 'Email must be a string' }),
    })
    .min(3, { message: 'Email must be at least 3 characters' })
    .max(256, { message: 'Email must be less than 256 characters' })
    .email({ message: 'Email must be a valid email' })
    .trim(),
  phone: z
    .number({
      errorMap: () => ({ message: 'Phone must be a number' }),
    })
    .positive({ message: 'Phone must be greater than 0' })
    .gte(1000000000, { message: 'Phone must be greater than 10 digits' })
    .lte(9999999999, { message: 'Phone must be less than 10 digits' })
    .transform(val => val.toString()),
  password: z
    .string({
      errorMap: () => ({ message: 'Password must be a string' }),
    })
    .min(3, { message: 'Password must be at least 3 characters' })
    .max(256, { message: 'Password must be less than 256 characters' })
    .trim(),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const createUserJsonSchema = {
  body: zodToJsonSchema(createUserBodySchema, {
    name: 'createUserBodySchema',
    errorMessages: true,
  }),
};

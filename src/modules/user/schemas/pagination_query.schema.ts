import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const getUserQuerySchema = z.object({
  page: z
    .number({
      errorMap: () => ({ message: 'Page must be a number' }),
    })
    .positive({ message: 'Page must be greater than 0' })
    .optional()
    .catch(1),
  limit: z
    .number({
      errorMap: () => ({ message: 'Limit must be a number' }),
    })
    .positive({ message: 'Limit must be greater than 0' })
    .optional()
    .catch(10),
});

export type GetUserQuery = z.infer<typeof getUserQuerySchema>;

export const getUserQueryJsonSchema = {
  querystring: zodToJsonSchema(getUserQuerySchema, {
    name: 'getUserQuerySchema',
    errorMessages: true,
  }),
};

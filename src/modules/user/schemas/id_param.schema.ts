import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const getUserParamSchema = z.object({
  id: z
    .number({
      errorMap: () => ({ message: 'ID must be a number' }),
    })
    .positive({ message: 'ID must be greater than 0' }),
});

export type GetUserParam = z.infer<typeof getUserParamSchema>;

export const getUserJsonSchema = {
  params: zodToJsonSchema(getUserParamSchema, {
    name: 'getUserParamSchema',
    errorMessages: true,
  }),
};

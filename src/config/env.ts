import zennv from 'zennv';
import { z } from 'zod';

const env = zennv({
  dotenv: true,
  schema: z.object({
    NODE_ENV: z.string().default('development'),
    API_PORT: z.number().default(8000),
    API_HOST: z.string().default('0.0.0.0'),
    MAIL_URL: z.string().default('http://localhost:8000'),
    CLIENT_URL: z.string().default('http://localhost:3000'),
    DATABASE_HOST: z.string().default('localhost'),
    MYSQL_HOST: z.string().default('localhost'),
    MYSQL_PORT: z.number().default(3306),
    MYSQL_DATABASE: z.string(),
    MYSQL_USER: z.string(),
    MYSQL_PASSWORD: z.string(),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.number(),
    MAIL_USERNAME: z.string(),
    MAIL_PASSWORD: z.string(),
    JWT_KEY: z.string().default('supersecretkey'),
  }),
});

export default env;

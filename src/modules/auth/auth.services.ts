import { fastifyApp } from '../..';
import { AuthType } from '../../@types/user.type';
import { CustomInvalidRequestError } from '../../utils/exceptions';
import { getByEmail } from './auth.repository';
import { LoginBody } from './schemas/login.schema';

export async function signin(user: LoginBody): Promise<AuthType> {
  const app = await fastifyApp;
  const { email, password } = user;

  const userByEmail = await getByEmail(email);
  if (!userByEmail) {
    throw new CustomInvalidRequestError('Invalid credentials');
  }
  const isPasswordValid = await app.bcrypt.compare(password, userByEmail.password);
  if (!isPasswordValid) {
    throw new CustomInvalidRequestError('Invalid credentials');
  }

  delete userByEmail['password'];

  const token = app.jwt.sign({ userByEmail });
  return {
    ...userByEmail,
    access_token: token,
  };
}

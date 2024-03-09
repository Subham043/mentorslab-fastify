import { CreateUserBody } from './user.schemas';
import { createUser, getByEmail, getByPhone } from './user.repository';
import { v4 as uuidv4 } from 'uuid';
import { CustomInputValidationError } from '../../utils/exceptions';
import { fastifyApp } from '../../index';

export async function create(user: CreateUserBody) {
  const app = await fastifyApp;
  const { name, email, phone, password } = user;
  const hashedPassword = await app.bcrypt.hash(password);
  const data = {
    name,
    email,
    phone,
    password: hashedPassword,
    key: uuidv4(),
  };

  const userByEmail = await getByEmail(email);
  if (userByEmail) {
    throw new CustomInputValidationError({
      email: 'Email is taken',
    });
  }
  const userByPhone = await getByPhone(phone);
  if (userByPhone) {
    throw new CustomInputValidationError({
      email: 'Phone is taken',
    });
  }
  return await createUser(data);
}

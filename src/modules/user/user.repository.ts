import { eq } from 'drizzle-orm';
import { InferInsertModel } from 'drizzle-orm';
import db from '../../db';
import { users } from '../../db/schema/user';

export async function createUser(data: InferInsertModel<typeof users>) {
  const result = await db.insert(users).values(data);
  return await getById(result[0].insertId);
}

export async function getById(id: number) {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      status: users.status,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, id));
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export async function getByEmail(email: string) {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      status: users.status,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.email, email));
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

export async function getByPhone(phone: string) {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      status: users.status,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.phone, phone));
  if (data.length > 0) {
    return data[0];
  }
  return null;
}

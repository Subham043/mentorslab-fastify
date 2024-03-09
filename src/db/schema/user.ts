import {
  bigint,
  varchar,
  mysqlTable,
  timestamp,
  unique,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
  'users',
  {
    id: bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    phone: varchar('phone', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    key: varchar('key', { length: 256 }).notNull(),
    status: varchar('status', { length: 7, enum: ['active', 'blocked'] })
      .default('active')
      .notNull(),
    emailVerified: varchar('emailVerified', { length: 7, enum: ['yes', 'no'] })
      .default('no')
      .notNull(),
    role: varchar('role', { length: 7, enum: ['user', 'admin', 'school'] })
      .default('user')
      .notNull(),
    verifiedAt: timestamp('verifiedAt'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  t => ({
    user_key_unique: unique('user_key_unique').on(t.id, t.key),
    user_email_phone_unique: unique('user_email_phone_unique').on(t.id, t.email, t.phone),
    emailIdx: uniqueIndex('email_idx').on(t.email),
    phoneIdx: uniqueIndex('phone_idx').on(t.phone),
    keyIdx: uniqueIndex('key_idx').on(t.key),
  }),
);

import env from '../config/env';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connectionUrl = `mysql://${env.MYSQL_USER}:${env.MYSQL_PASSWORD}@${env.DATABASE_HOST}:${env.MYSQL_PORT}/${env.MYSQL_DATABASE}`;

const connection = mysql.createPool(connectionUrl);

const db = drizzle(connection);

export default db;

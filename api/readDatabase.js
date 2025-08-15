// Backend route that gets all users from database

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.HOST_MYSQL, process.env.USER_MYSQL, process.env.PASSWORD_MYSQL, process.env.DATABASE_MYSQL);

// Creates connection
const connectionConfig = {
  host: process.env.HOST_MYSQL,
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DATABASE_MYSQL,
  connectTimeout: 60000
};

export default async (req, res) => {
    try {
        const connection = await mysql.createConnection(connectionConfig);
        const [rows] = await connection.execute('SELECT * FROM users');
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send(error);
    }
};
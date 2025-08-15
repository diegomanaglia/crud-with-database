// Backend route that deletes a user from database

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Creates database connection
const connectionConfig = {
  host: process.env.HOST_MYSQL,
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: process.env.DATABASE_MYSQL,
  connectTimeout: 60000
};

// Function that deletes a user
export default async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  let connection;
  try {
    // Creates connection
    connection = await mysql.createConnection(connectionConfig);

    // Deletes from table
    const [result] = await connection.execute(
      'DELETE FROM users WHERE id=?',
      [id]
    );

    res.status(200).json({ message: 'User deleted successfully!', id: result.insertId });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  } finally {
    if (connection) await connection.end();
  }
};

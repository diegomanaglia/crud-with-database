// Backend route that saves a user edition to the database

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

// Function that saves a user 
export default async (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({ error: 'ID, name, and email are required' });
  }

  let connection;
  try {
    // Creates connection
    connection = await mysql.createConnection(connectionConfig);

    // Updates table
    const [result] = await connection.execute(
      'UPDATE users SET name=?, email=? WHERE id=?',
      [name, email, id]
    );

    res.status(200).json({ message: 'User updated successfully!', id: result.insertId });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  } finally {
    if (connection) await connection.end();
  }
};
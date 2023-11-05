import { createPool } from '@vercel/postgres';
require('dotenv').config();

const pool = createPool({
    connectionString: process.env.psql,
});

module.exports = async (req, res) => {
    try {
        const lista = await pool.sql`SELECT * FROM exemplo;`;
        res.status(200).send(lista.rows);
    } catch (error) {
        res.status(500).send(error);
    }
    
}
import { createPool } from '@vercel/postgres';
require('dotenv').config();

const pool = createPool({
    connectionString: process.env.psql,
});

pool.connect();

module.exports = async (req, res) => {
    const { name, email } = req.body; // O valor para inserir na tabela
    try {
        const result = await pool.sql`INSERT INTO exemplo (name, email) VALUES (${name}, ${email})`;
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

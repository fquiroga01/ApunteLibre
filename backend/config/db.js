import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'apuntesdb',
  port: Number(process.env.DB_PORT) || 3306,
});

// Función opcional para probar la conexión
export const testConnection = async () => {
  try {
    const conn = await db.getConnection();
    console.log('Conectado a la base de datos MySQL');
    conn.release();
  } catch (err) {
    console.error('Error al conectar la base de datos:', err.message);
  }
};


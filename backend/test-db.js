import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('Conexión a la base de datos exitosa');

  // 1. Prueba simple
  connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) console.error('Error en prueba simple:', err);
    else console.log('Prueba simple 1+1 =', results[0].resultado);
  });

  // 2. Mostrar tablas existentes
  connection.query('SHOW TABLES', (err, results) => {
    if (err) console.error('Error mostrando tablas:', err);
    else console.log('Tablas existentes:', results.map(r => Object.values(r)[0]));
  });

  // 3. Insert temporal en users
  connection.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    ['testUser', 'test2@example.com', '123456'],
    (err, result) => {
      if(err) console.error('Error insertando:', err);
      else console.log('Insert exitoso, id:', result.insertId);

      // 4. Leer datos
      connection.query('SELECT * FROM users WHERE id = ?', [result.insertId], (err, rows) => {
        if(err) console.error('Error leyendo usuarios:', err);
        else console.log('Usuario insertado:', rows);

        // Cerrar conexión
        connection.end();
      });
    }
  );
});

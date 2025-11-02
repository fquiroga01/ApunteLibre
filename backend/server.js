import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, testConnection } from './config/db.js';
import usersRoutes from './routes/users.js';
import notesRoutes from './routes/notes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/notes', notesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando');
});

// Verificar conexión a la DB
await testConnection();

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


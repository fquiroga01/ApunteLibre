import express from 'express';
import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registrar usuario
router.post('/register', async (req, res) => {
  const { username, email, password, region, comuna } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'Faltan campos obligatorios' });

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Email ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, email, password, region, comuna) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, region, comuna]
    );

    res.status(201).json({ message: 'Usuario registrado', userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Login usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en login' });
  }
});

export default router;

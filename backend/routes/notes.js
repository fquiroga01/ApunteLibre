import express from 'express';
import { db } from '../config/db.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener todas las notas
router.get('/', async (req, res) => {
  try {
    const [notes] = await db.query('SELECT * FROM notes');
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener notas' });
  }
});

// Obtener nota por ID
router.get('/:id', async (req, res) => {
  try {
    const [note] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    if (!note.length) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json(note[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener nota' });
  }
});

// Crear nota (requiere autenticación)
router.post('/', authMiddleware, async (req, res) => {
  const { title, subject, description, file } = req.body;

  if (!title || !subject || !description)
    return res.status(400).json({ message: 'Faltan campos obligatorios' });

  try {
    const [result] = await db.query(
      'INSERT INTO notes (title, subject, description, authorId, author, file) VALUES (?, ?, ?, ?, ?, ?)',
      [title, subject, description, req.user.id, req.user.username, file || '']
    );

    res.status(201).json({ message: 'Nota creada', noteId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear nota' });
  }
});

// Actualizar nota
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, subject, description, file } = req.body;

  try {
    const [note] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    if (!note.length) return res.status(404).json({ message: 'Nota no encontrada' });
    if (note[0].authorId !== req.user.id)
      return res.status(403).json({ message: 'No tienes permiso para editar esta nota' });

    await db.query(
      'UPDATE notes SET title = ?, subject = ?, description = ?, file = ? WHERE id = ?',
      [title || note[0].title, subject || note[0].subject, description || note[0].description, file || note[0].file, req.params.id]
    );

    res.json({ message: 'Nota actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar nota' });
  }
});

// Eliminar nota
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [note] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    if (!note.length) return res.status(404).json({ message: 'Nota no encontrada' });
    if (note[0].authorId !== req.user.id)
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta nota' });

    await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar nota' });
  }
});

export default router;

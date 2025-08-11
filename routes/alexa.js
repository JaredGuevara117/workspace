const express = require('express');
const router = express.Router();
const Entorno = require('../models/entorno');

// Obtener nombres de entornos
router.get('/entornos', async (req, res) => {
  try {
    // Usa tu ID de usuario directamente
    const entornos = await Entorno.find({ 
      usuario: process.env.YOUR_USER_ID 
    }, 'nombre estado');
    
    res.json(entornos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener entornos' });
  }
});

// Activar/desactivar entorno
router.put('/entornos/:nombre', async (req, res) => {
  try {
    const entorno = await Entorno.findOneAndUpdate(
      { 
        nombre: req.params.nombre,
        usuario: process.env.YOUR_USER_ID
      },
      { estado: req.body.estado },
      { new: true }
    );
    
    if (!entorno) {
      return res.status(404).json({ error: 'Entorno no encontrado' });
    }
    
    res.json({ 
      message: `Entorno ${entorno.nombre} ${entorno.estado ? 'activado' : 'desactivado'}`,
      entorno
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar entorno' });
  }
});

module.exports = router;
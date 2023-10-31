import { Router } from "express";
import { prisma } from '../db.js';

const router = Router();
//Ruta para el GET total
router.get('/imagenes', async (req, res) => {
    try {
        const imagenes = await prisma.imagen.findMany();

        res.json(imagenes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las imágenes.' });
    }
});

//POST total
router.post('/imagenes', async (req, res) => {
    try {
        const nuevaImagen = await prisma.imagen.create({
            data: req.body
        });
        res.json(nuevaImagen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo crear la imagen.' });
    }
});

// Ruta para actualizar una imagen existente
router.put('/imagenes/:id', async (req, res) => {
    const imagenId = parseInt(req.params.id);

    try {
        const imagenActualizada = await prisma.imagen.update({
            where: { id: imagenId },
            data: req.body
        });

        res.json(imagenActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la imagen.' });
    }
});

// Ruta para eliminar una imagen
router.delete('/imagenes/:id', async (req, res) => {
    const imagenId = parseInt(req.params.id);

    try {
        await prisma.imagen.delete({
            where: { id: imagenId }
        });

        res.json({ message: 'Imagen eliminada exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la imagen.' });
    }
});


export default router;
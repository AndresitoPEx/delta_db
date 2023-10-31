import { Router } from "express";
import { prisma } from '../db.js';

const router = Router();

// Ruta para obtener todas las categorías
router.get('/categorias', async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.json(categorias);
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ error: "Hubo un error al obtener las categorías." });
    }
});

// Ruta para crear una nueva categoría
router.post('/categorias', async (req, res) => {
    try {
        const nuevaCategoria = await prisma.categoria.create({
            data: req.body,
        });
        res.json(nuevaCategoria);
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al crear una categoría:", error);
        res.status(500).json({ error: "Hubo un error al crear la categoría." });
    }
});

// Ruta para obtener una categoría por ID
router.get('/categorias/:id', async (req, res) => {
    const categoriaId = parseInt(req.params.id);

    try {
        const categoria = await prisma.categoria.findUnique({
            where: { id: categoriaId },
        });

        if (categoria) {
            res.json(categoria);
        } else {
            // Categoría no encontrada, devuelve una respuesta 404
            res.status(404).json({ error: "Categoría no encontrada." });
        }
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al obtener una categoría por ID:", error);
        res.status(500).json({ error: "Hubo un error al obtener la categoría." });
    }
});

// Ruta para actualizar una categoría por ID
router.put('/categorias/:id', async (req, res) => {
    const categoriaId = parseInt(req.params.id);

    try {
        const categoriaActualizada = await prisma.categoria.update({
            where: { id: categoriaId },
            data: req.body,
        });

        res.json(categoriaActualizada);
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al actualizar una categoría:", error);
        res.status(500).json({ error: "Hubo un error al actualizar la categoría." });
    }
});

// Ruta para eliminar una categoría por ID
router.delete('/categorias/:id', async (req, res) => {
    const categoriaId = parseInt(req.params.id);

    try {
        await prisma.categoria.delete({
            where: { id: categoriaId },
        });

        res.json({ message: "Categoría eliminada exitosamente." });
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al eliminar una categoría:", error);
        res.status(500).json({ error: "Hubo un error al eliminar la categoría." });
    }
});


export default router;
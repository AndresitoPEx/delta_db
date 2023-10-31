import { Router } from "express";
import { prisma } from '../db.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/producto', async (req, res) => {
    try {
        const productos = await prisma.producto.findMany();
        res.json(productos);
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Hubo un error al obtener los productos." });
    }
});

// Ruta para crear un nuevo producto
router.post('/producto', async (req, res) => {
    try {
        const newProduct = await prisma.producto.create({
            data: req.body,
        });
        res.json(newProduct);
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al crear un producto:", error);
        res.status(500).json({ error: "Hubo un error al crear el producto." });
    }
});

// Ruta para obtener un producto por ID
router.get('/producto/:id', async (req, res) => {
    const productoId = parseInt(req.params.id);

    try {
        const producto = await prisma.producto.findUnique({
            where: { id: productoId },
        });

        if (producto) {
            res.json(producto);
        } else {
            // Producto no encontrado, devuelve una respuesta 404
            res.status(404).json({ error: "Producto no encontrado." });
        }
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al obtener un producto por ID:", error);
        res.status(500).json({ error: "Hubo un error al obtener el producto." });
    }
});

// Ruta para actualizar un producto por ID
router.put('/producto/:id', async (req, res) => {
    const productoId = parseInt(req.params.id);

    try {
        const productoActualizado = await prisma.producto.update({
            where: { id: productoId },
            data: req.body,
        });

        res.json(productoActualizado);
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al actualizar un producto:", error);
        res.status(500).json({ error: "Hubo un error al actualizar el producto." });
    }
});

// Ruta para eliminar un producto por ID
router.delete('/producto/:id', async (req, res) => {
    const productoId = parseInt(req.params.id);

    try {
        await prisma.producto.delete({
            where: { id: productoId },
        });

        res.json({ message: "Producto eliminado exitosamente." });
    } catch (error) {
        // Manejo de errores: envía una respuesta de error al cliente
        console.error("Error al eliminar un producto:", error);
        res.status(500).json({ error: "Hubo un error al eliminar el producto." });
    }
});


export default router;
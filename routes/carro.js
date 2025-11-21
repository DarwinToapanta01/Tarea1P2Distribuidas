const express = require("express");
const router = express.Router();
const pool = require("../database/database");

// Obtener todos los carros (incluye datos del usuario dueño)
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT carro.*, usuario.nombre AS usuario_nombre, usuario.celular AS usuario_celular
            FROM carro INNER JOIN usuario ON carro.id_usuario = usuario.id`);
        res.json(result.rows);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener un carro por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT carro.*, usuario.nombre AS usuario_nombre, usuario.celular AS usuario_celular
            FROM carro INNER JOIN usuario ON carro.id_usuario = usuario.id WHERE carro.id = $1`, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Crear un carro
router.post("/", async (req, res) => {
    try {
        const { marca, placa, color, id_usuario } = req.body;
        const result = await pool.query(`
            INSERT INTO carro (marca, placa, color, id_usuario) VALUES ($1, $2, $3, $4) RETURNING * `, [marca, placa, color, id_usuario]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Actualizar un carro
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { marca, placa, color, id_usuario } = req.body;

        const result = await pool.query(`
            UPDATE carro 
            SET marca = $1, placa = $2, color = $3, id_usuario = $4 WHERE id = $5 RETURNING * `, [marca, placa, color, id_usuario, id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Eliminar un carro
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM carro WHERE id = $1", [id]);
        res.status(200).json({ mensaje: "Carro eliminado correctamente" });
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
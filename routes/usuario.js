const express = require('express');
const router = express.Router();
const pool = require('../database/database');

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuario");
        res.json(result.rows);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM usuario where id=$1", [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { nombre, celular } = req.body;
        const result = await pool.query("insert into usuario (nombre, celular) values ($1,$2) returning*",
            [nombre, celular]);
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, celular } = req.body;
        const result = await pool.query("update usuario set nombre=$1, celular=$2 where id=$3 returning *",
            [nombre, celular, id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("delete from usuario where id=$1", [id]);
        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error :" + error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
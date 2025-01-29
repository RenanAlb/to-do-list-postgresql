const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();

const pool = require("../database/postgres");

router.post("/criar-nova-tarefa", async (req, res) => {
  try {
    const { tarefa, id } = req.body;

    if (!tarefa || !id) {
      return res.status(500).json({
        message: "Erro ao criar a tarefa! Sem dados suficientes!",
        ok: false,
      });
    }

    const adicionarTarefa = await pool.query(
      "INSERT INTO tarefas (tarefa, id_user) VALUES ($1, $2)",
      [tarefa, id]
    );

    console.log(adicionarTarefa);
    res.status(200).json({
      message: "Tarefa adicionada com sucesso!",
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao criar a tarefa!", ok: false, details: error });
  }
});

router.get("/get-tarefas", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar as tarefas! ID ausente!", ok: false });
    }

    const getTarefas = await pool.query(
      "SELECT * FROM tarefas WHERE id_user = $1",
      [id]
    );

    console.log(getTarefas);

    res.status(200).json({
      message: "Tarefas buscadas com sucesso!",
      ok: true,
      response: getTarefas.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar as tarefas!",
      ok: false,
      details: error,
    });
  }
});

router.delete("/delete-tarefa/:id_tarefa/:id_user", async (req, res) => {
  try {
    const { id_tarefa, id_user } = req.params;

    if (!id_tarefa || !id_user) {
      return res.status(500).json({
        message: "Erro ao deletar a tarefa! Credenciais ausentes!",
        ok: false,
      });
    }

    const deleteTarefa = await pool.query(
      "DELETE FROM tarefas WHERE id = $1 AND id_user = $2 RETURNING *",
      [id_tarefa, id_user]
    );

    if (deleteTarefa.rowCount === 0) {
      return res.status(404).json({
        message: "Tarefa não encontrada ou permissão negada",
        ok: false,
      });
    }

    res.status(200).json({
      message: "Tarefas buscadas com sucesso!",
      ok: true,
      response: deleteTarefa.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao deletar a tarefa!",
      ok: false,
      details: error,
    });
  }
});

router.put(
  "/edit-tarefa/:id_tarefa/:id_user/:nova_tarefa",
  async (req, res) => {
    try {
      const { id_tarefa, id_user, nova_tarefa } = req.params;

      if (!id_tarefa || !id_user || !nova_tarefa) {
        return res.status(500).json({
          message: "Erro ao editar a tarefa! Credenciais ausentes!",
          ok: false,
        });
      }

      const editTarefa = await pool.query(
        "UPDATE tarefas SET tarefa = $1 WHERE id = $2 AND id_user = $3 RETURNING *",
        [nova_tarefa, id_tarefa, id_user]
      );

      if (editTarefa.rowCount === 0) {
        return res.status(404).json({
          message: "Erro não identificado ao atualizar a tarefa",
          ok: false,
        });
      }

      res.status(200).json({
        message: "Tarefas editada com sucesso!",
        ok: true,
        response: editTarefa.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Erro ao editar a tarefa!",
        ok: false,
        details: error,
      });
    }
  }
);

module.exports = router;

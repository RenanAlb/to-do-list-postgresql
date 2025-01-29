const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// PostgreSQL
const pool = require("../database/postgres");

const verificarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({ message: "Token não fornecido", ok: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token inválido!", ok: false });
    }

    req.user = decoded;
    next();
  });
};

router.post("/cadastrar-cliente", async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const verifyUser = await pool.query(
      "SELECT * FROM clientes WHERE nome = $1",
      [nome]
    );

    console.log(verifyUser);

    if (verifyUser.rows.length !== 0) {
      return res
        .status(500)
        .json({ message: "Usuário já existente", ok: false });
    }

    const hash = await bcryptjs.hash(senha, 13);

    const adicionarCliente = await pool.query(
      "INSERT INTO clientes (nome, senha) VALUES ($1, $2) RETURNING *",
      [nome, hash]
    );

    console.log(adicionarCliente);

    const token = jwt.sign(
      {
        id: adicionarCliente.rows[0].id,
        nome,
        tarefas: adicionarCliente.tarefas || [],
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Cliente adicionado");

    res.status(200).json({
      message: "Cliente adicionado com sucesso!",
      ok: true,
      details: adicionarCliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocorreu um erro ao cadastrar o cliente",
      ok: false,
      details: error,
    });
  }
});

router.post("/login-cliente", async (req, res) => {
  try {
    const { nome, senha } = req.body;

    const verifyUser = await pool.query(
      "SELECT * FROM clientes WHERE nome = $1",
      [nome]
    );

    console.log(verifyUser);

    if (verifyUser.rows.length === 0) {
      return res
        .status(500)
        .json({ message: "Usuário não encontrado", ok: false });
    }

    const user = verifyUser.rows[0];

    const verifySenha = await bcryptjs.compare(senha, user.senha);

    if (!verifySenha) {
      return res.status(500).json({ message: "Senha incorreta", ok: false });
    }

    const token = jwt.sign(
      {
        id: user.id,
        nome,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Cliente logado");

    res.status(200).json({
      message: "Cliente logado com sucesso!",
      ok: true,
      details: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocorreu um erro ao logar o cliente",
      ok: false,
      details: error,
    });
  }
});

router.get("/credentials-user", verificarToken, async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: "Credenciais do usuário buscadas com sucesso!",
      ok: true,
      response: req.user,
    });
  } else {
    return res
      .status(500)
      .json({ message: "Erro ao buscar as credenciais do usuário", ok: false });
  }
});

module.exports = router;

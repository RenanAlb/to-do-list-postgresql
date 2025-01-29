const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const routeClientes = require("./routes/clientes");
const routeTarefas = require("./routes/tarefas");
const path = require("path");

// Dotenv
dotenv.config();

// Config. server
const app = express();
const port = 8080;

// Middlewares
app.use(
  cors({
    origin: "https://to-do-list-postgresql-fyr2.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/clientes", routeClientes);
app.use("/tarefas", routeTarefas);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "../frontend/dist");
  res.sendFile(path.join(filePath, "index.html"));
});

// Start server
app.listen(port, () =>
  console.log("Servidor ativo em http://localhost:" + port)
);

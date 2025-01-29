const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Conectado ao PostgreSQl");
    client.release();
  } catch (error) {
    console.error("Erro ao se conectar ao PostgreSQL. Error =>", error);
  }
})();

module.exports = pool;

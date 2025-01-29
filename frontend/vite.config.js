import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "dist"), // Diretório onde a build será gerada
    rollupOptions: {
      input: "index.html", // Caminho para o arquivo de entrada
    },
  },
});

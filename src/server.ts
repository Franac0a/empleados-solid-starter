import "dotenv/config";
import mongoose from "mongoose";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 3000);
const MONGO_URI =
  process.env.MONGO_URI ?? "mongodb://localhost:27017/employees_db";

const app = createApp();

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a MongoDB", error);
    process.exit(1);
  });

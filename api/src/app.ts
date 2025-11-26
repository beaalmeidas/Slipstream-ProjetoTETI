import express from "express";
import cors from "cors";
import router from "./routes/index";

const app = express();

// CORS global - deve vir antes das rotas
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true
}));

// Permitir preflight
app.options("*", cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true
}));

app.use(express.json());

// Aqui sim você usa suas rotas
app.use("/api", router);

export default app;

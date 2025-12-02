import express from "express";
import cors from "cors";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";


const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Slipstream API",
            version: "1.0.0",
            description: "F1 race reviews, championship information and management for drivers and teams.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        tags: [
            { name: "User", description: "User CRUD operations" },
            { name: "Team", description: "Team CRUD operations" },
            { name: "Driver", description: "Driver CRUD operations" },
            { name: "Race", description: "Race CRUD operations" }
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`\n-- Server running at http://localhost:${PORT}`);
    console.log(`-- Swagger docs available at http://localhost:${PORT}/api-docs`);
});

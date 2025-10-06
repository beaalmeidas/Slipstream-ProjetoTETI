import express from "express";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";


const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

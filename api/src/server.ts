import "dotenv/config";

import express from "express";
import cors from "cors";
import router from "./routes/index";
import swaggerUi from "swagger-ui-express";


const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors({
//     origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? []
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];

    app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

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
                url: process.env.NODE_ENV === 'production' 
                ? `https://slipstream-api.onrender.com`  // ← VAI MUDAR DEPOIS DO DEPLOY
                : "http://localhost:3000",
            },
        ],
        tags: [
            { name: "User", description: "User operations" },
            { name: "Team", description: "Team operations" },
            { name: "Driver", description: "Driver operations" },
            { name: "Race", description: "Race operations" },
            { name: "Posts", description: "Post operations" },
            { name: "Comments", description: "Comment operations" }
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", router);

// Health check route
app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV 
    });
});

app.listen(PORT, () => {
    console.log(`\n--- Server running on port ${PORT}`);
    console.log(`--- Swagger docs: http://localhost:${PORT}/api-docs`);
    console.log(`--- Health check: http://localhost:${PORT}/health`);
    console.log(`--- Environment: ${process.env.NODE_ENV || 'development'}`);
});

const express = require("express");
const fs = require("fs");
const path = require("path");
const connectDB = require("./configs/database");
const { PORT } = require("./environments/Application");
require("dotenv").config();
const HTTP_STATUS = require("./utils/HttpStatus");
const cors = require("cors");
class App {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        })); 
        this.middlewares();
        this.routes();
        this.setAPISizeLimit("10mb");
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        const routesPath = path.join(__dirname, "routers");
        const v1Router = express.Router();

        fs.readdirSync(routesPath).forEach(file => {
            if (file.endsWith(".js")) {
                const route = require(path.join(routesPath, file));
                const routeName = file.split(".")[0];
                v1Router.use(`/${routeName}`, route);
            }
        });

        this.app.use("/api/v1", v1Router);
        const frontendPath = path.join(__dirname, "../shortenurl/build");
        this.app.use(express.static(frontendPath));
        this.app.get("*", (req, res) => {
            res.sendFile(path.join(frontendPath, "index.html"));
        });
    }

    setAPISizeLimit(limit) {
        this.app.use(express.json({ limit: limit }));
        this.app.use(express.urlencoded({ limit: limit, extended: true }));
    }

    async db() {
        await connectDB();
    }

    async start() {
        await this.db();
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = new App();

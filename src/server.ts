import express from "express";
import { routes } from "./routes";

const app = express();

export default app

const PORT = process.env.PORT || 3001;

export function setupServer() {
    app.use(routes)

    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
}
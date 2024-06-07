import "express-async-errors";
import express from "express";
import routes from "./user/routes/user.route";


const app = express();
app.use(express.json());
app.use(routes);

export default app;

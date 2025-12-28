import express, { NextFunction, Request, Response } from "express"
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";




const app = express()
const port = config.port;

// parser
app.use(express.json());
// app.use(express.urlencoded());

// DB




initDB();



app.get('/' ,logger, (req: Request, res: Response) => {
  res.send('Hello World! Its Me')
})

app.use("/users", userRoutes)


// app.use("/todos", todoRoutes)

app.use("/auth", authRouter)

app.use((req, res)=>{
res.status(404).json({
success: false,
message: "Route Not Found",
path: req.path,
});
});

export default app;
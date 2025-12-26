import express, { NextFunction, Request, Response } from "express"
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";




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


app.post("/todos", async(req: Request, res: Response)=>{
  const {user_id , title}= req.body;

  try{
const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,[user_id, title] 

);
// console.log(result.rows[0]);
res.status(201).json({
    success: true,
    message: "Todo Created Successfully",
    data: result.rows[0],
  })

}
catch(err: any){
  res.status(500).json({
    success: false,
    message: err.message
  })
}
})

app.get("/todos", async(req: Request, res: Response)=>{
  try{
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      data: result.rows,

    })

  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
})

app.use((req, res)=>{
res.status(404).json({
success: false,
message: "Route Not Found",
path: req.path,
});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

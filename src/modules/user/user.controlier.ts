import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async(req: Request, res: Response) => {
  

try{
const result =await userServices.createUser(req.body)
// console.log(result.rows[0]);
res.status(201).json({
    success: false,
    message: "Data Inserted Successfully",
    data: result.rows[0],
  })

}
catch(err: any){
  res.status(500).json({
    success: false,
    message: err.message
  })
}
}

const getUser = async(req: Request, res: Response)=>{
  try{
    const result =await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows,

    })

  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
}
const getSingleuser = async(req: Request, res: Response)=>{
  // console.log(req.params.id);
  // res.send({message: "API is cool..."})

  try{  
    const result = await userServices.getSingleuser(req.params.id!);
    console.log(result.rows)
    if(result.rows.length=== 0){
      res.status(404).json({
        success: false,
      message: "User not found",
      })
    }else{
      res.status(200).json({
        success: true,
        message: "User fetch successfully",
        data: result.rows[0],
      })
    }
  }
  catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      
    })
  }
}
const updateUser = async(req: Request, res: Response)=>{
  // console.log(req.params.id);
  // res.send({message: "API is cool..."})
  const { name, email} = req.body;

  try{  
    const result = await userServices.updateUser(name, email, req.params.id!);
    

    if(result.rows.length=== 0){
      res.status(404).json({
        success: false,
      message: "User not found",
      })
    }else{
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      })
    }
  }
  catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      
    })
  }
}
const deleteUser = async(req: Request, res: Response)=>{
  // console.log(req.params.id);
  // res.send({message: "API is cool..."})

  try{  
    const result = await userServices.deleteUser(req.params.id!);
    console.log(result)

    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
      message: "User not found ",
      })
    }
    else{
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      })
    }
  }
  catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      
    })
  }
}
export const userController = {
    createUser,
    getUser,
    getSingleuser,
    updateUser,
    deleteUser,
};
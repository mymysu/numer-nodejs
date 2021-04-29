import express from "express"
import {Login,User} from "../controllers/user.controllers.js"
const user_route = express.Router()
user_route.post("/login",(req,res)=> Login(req,res))
user_route.get("/id/:id",(req,res)=> User(req,res)) 


// user_route.get("/",(req,res)=>{
//     res.json({
//         message : "Users Get"
//     })
// })


// user_route.put("/",(req,res)=>{
//     res.json({
//         message : "Users Put"
//     })
// })

// user_route.post("/",(req,res)=>{
//     res.json({
//         message : "Users Post"
//     })
// })

// user_route.delete("/",(req,res)=>{
//     res.json({
//         message : "Users Delete"
//     })
// })


export default user_route

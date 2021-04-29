import express from 'express'
import {Cramer,
     LuDecomposition,Jacobi, Gauss_E, Gauss_J,Gauss_S,Conjugate
   } from '../controllers/linear.controllers.js'

const linear_route = express.Router()
linear_route.post("/Cramer",(req,res)=> Cramer(req,res))
linear_route.post("/LuDecomposition",(req,res)=> LuDecomposition(req,res))
linear_route.post("/Gauss_E",(req,res)=> Gauss_E(req,res))
linear_route.post("/Gauss_J",(req,res)=> Gauss_J(req,res))
linear_route.post("/Jacobi",(req,res)=> Jacobi(req,res))
linear_route.post("/Gauss_S",(req,res)=> Gauss_S(req,res))
linear_route.post("/Conjugate",(req,res)=> Conjugate(req,res))
export default linear_route
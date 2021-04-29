import express from 'express'
import {Bisection,FalsePosition,Secant,OnePoint,NewtonRap
   } from '../controllers/root.controllers.js'

const root_route = express.Router()
root_route.post("/bisection",(req,res)=> Bisection(req,res))
root_route.post("/falsePosition",(req,res)=> FalsePosition(req,res))
root_route.post("/onePoint",(req,res)=> OnePoint(req,res))
root_route.post("/newtonRap",(req,res)=> NewtonRap(req,res))
root_route.post("/Secant",(req,res)=> Secant(req,res))

export default root_route
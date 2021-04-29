import express from 'express'
import {Newton,Langrange,spline1} from '../controllers/Interpolation.controllers.js'

const Interpolation_route = express.Router()

Interpolation_route.post("/Newton",(req,res)=> Newton(req,res))
Interpolation_route.post("/Langrange",(req,res)=> Langrange(req,res))
Interpolation_route.post("/spline",(req,res)=> spline1(req,res))

export default Interpolation_route
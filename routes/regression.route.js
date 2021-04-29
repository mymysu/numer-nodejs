import express from 'express'
import {Linear,poly,Multiple} from '../controllers/regression.controllers.js'

const regression_route = express.Router()
regression_route.post("/Linear",(req,res)=> Linear(req,res))
regression_route.post("/Polynomial",(req,res)=> poly(req,res))
regression_route.post("/Multiple",(req,res)=> Multiple(req,res))

export default regression_route
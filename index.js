import express from 'express';

import bodyParser from 'body-parser'
import cors from 'cors'
import rootof_route from './routes/root.route.js'
import linear_route from './routes/linear.route.js'
import Interpolation_route from './routes/Interpolation.route.js'
import regression_route from './routes/regression.route.js'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const swaggerDocument = require('./swagger.json')
import swaggerUi from 'swagger-ui-express'


const app = express();
const Port = 8080;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true }),
)

app.use('/api/root',rootof_route);
app.use('/api/linear',linear_route);
app.use('/api/Interpolation',Interpolation_route);
app.use('/api/regression',regression_route);



app.listen(Port,()=> {
    console.log(`Server stared at port ${Port}`)
})
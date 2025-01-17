import express, { json } from 'express';
import { budgetsRouter } from './routes/budgetRoutes.js';
import { corsMiddleware } from '../src/middlewares/cors.js';

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.use('/budgets', budgetsRouter);

app.listen(PORT, () =>{
    console.log(`server listening on port http://localhost:${PORT}`)
})
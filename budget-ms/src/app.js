import express, { json } from 'express';
import { budgetsRouter } from './routes/budgetRoutes.js';

const app = express()
app.use(json())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.use('/budgets', budgetsRouter);

app.listen(PORT, () =>{
    console.log(`server listening on port http://localhost:${PORT}`)
})
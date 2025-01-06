import express, { json } from 'express';
import { randomUUID } from 'node:crypto';
import { validateBudget, validatePartialBudget } from './schemas/budgetSchema.js';
import { readJSON } from './utils/utils.js';

const budgets = readJSON('./budgets.json');

const app = express()
app.use(json())
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234



app.get('/budgets', (req, res) => {
    const {LimitAmount} = req.query;
    if(LimitAmount){
        const amount = parseFloat(LimitAmount);
        // ¿Conviene filtrar por minimo o máximo?
        const filteredBudgets = budgets.filter(budget => budget.LimitAmount >= amount);
        return res.json(filteredBudgets);
    }
    res.json(budgets);
});


app.get('/budgets/:id', (req, res) => {
    const {id} = req.params
    const budget = budgets.find(budget => budget.id === id)
    if(budget) return res.json(budget);
    
    res.status(404).json({message: 'Presupuesto no encontrado'});
})


app.post('/budgets', (req, res) => {
    const result = validateBudget(req.body)
    if(result.error) {
        return res.status(400).json({ error : JSON.parse(result.error.message) })
    }
    const newBudget = {
        id : randomUUID(),
        ... result.data
    }

    budgets.push(newBudget);

    res.status(201).json(newBudget)
})

app.delete('/budgets/:id', (req, res) => {
    const { id } = req.params
    const budgetIndex = budgets.findIndex(b => b.id === id)
    if (budgetIndex === -1) {
        return res.status(404).json({ message : 'Budget not found' })
    }
    budgets.splice(budgetIndex, 1)
    return res.json({ message : 'Budget deleted'})
})

app.patch('/budgets/:id', (req,res) => {
    const { id } = req.params
    const result = validatePartialBudget(req.body)

    if(result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }

    const budgetIndex = budgets.findIndex(budget => budget.id === id)

    if (budgetIndex === -1) {
        return res.status(404).json({ message: 'Budget not found'})
    }

    const updatedBudget = {
        ... budgets[budgetIndex],
        ... result.data
    }

    budgets[budgetIndex] = updatedBudget

    return res.json(updatedBudget)
})

app.listen(PORT, () =>{
    console.log(`server listening on port http://localhost:${PORT}`)
})
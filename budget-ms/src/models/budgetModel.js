import { readJSON } from "../utils/utils.js";
import { randomUUID } from 'node:crypto'

const budgets = readJSON('./budgets.json');

export class BudgetModel{
    static async getAll ({LimitAmount}) {
        if(LimitAmount){
            const amount = parseFloat(LimitAmount);
            // ¿Conviene filtrar por minimo o máximo?
            const filteredBudgets = budgets.filter(budget => budget.LimitAmount >= amount);
            return filteredBudgets;
        }
        return budgets;
    }

    static async getById ({id}) {
        const budget = budgets.find(budget => budget.id === id)
        return budget
    }

    static async create ({input}) {
        const newBudget = {
            id : randomUUID(),
            ... input
        }

        budgets.push(newBudget);

        return newBudget
    }

    static async delete ({id}){
        const budgetIndex = budgets.findIndex(b => b.id === id)
        if (budgetIndex === -1) return false

        budgets.splice(budgetIndex, 1)
        return true
    }

    static async update ({ id, input }) {
        const budgetIndex = budgets.findIndex(budget => budget.id === id)

        if (budgetIndex === -1) return false
        
        const updatedBudget = {
            ... budgets[budgetIndex],
            ... input
        }

        return updatedBudget
    }
}

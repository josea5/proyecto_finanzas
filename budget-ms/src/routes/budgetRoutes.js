import { Router } from "express";
import { BudgetController } from "../controllers/budgetController.js";

export const budgetsRouter = Router();

budgetsRouter.get('/', BudgetController.getAll) //OK
budgetsRouter.get('/:id', BudgetController.getById) //OK
budgetsRouter.post('/', BudgetController.create) //OK
budgetsRouter.delete('/:id', BudgetController.delete) //OK
budgetsRouter.patch('/:id', BudgetController.update) //OK
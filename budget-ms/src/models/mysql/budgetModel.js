import mysql from 'mysql2/promise'
import { validate as isUUID } from 'uuid';

//Configurar variables de entorno:
const config = {
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: 'pass',
    database: 'budgetsdb'
}

const connection = await mysql.createConnection(config);


export class BudgetModel{
    static async getAll ({LimitAmount}) {
        // todo
        if (LimitAmount) {
            const [result] = await connection.query(
                'SELECT BIN_TO_UUID(id) id, LimitAmount, StartDate, EndDate FROM Budget WHERE LimitAmount >= ?;', 
                [LimitAmount]
            );
            return result;
        }
        const [result] = await connection.query(
            'SELECT BIN_TO_UUID(id) id, LimitAmount, StartDate, EndDate FROM Budget;'
        )

        return result;
    }

    static async getById ({id}) {
        // todo
        const [result] = await connection.query(
            'SELECT BIN_TO_UUID(id) id, LimitAmount, StartDate, EndDate FROM Budget WHERE id = UUID_TO_BIN(?);',
            [id]
        )

        if (result.length === 0) return null;

        return result;

    }

    static async create ({input}) {
        const { LimitAmount, StartDate, EndDate } = input

        if (new Date(StartDate) > new Date(EndDate)) {
            throw new Error('StartDate cannot be later than EndDate');
        }

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{uuid}] = uuidResult

        try {
            await connection.query(
            `INSERT INTO Budget (id, LimitAmount, StartDate, EndDate) 
                VALUES (UUID_TO_BIN(?), ?, ? ,?);`,
            [uuid, LimitAmount, StartDate, EndDate]
            );
        } catch (e) {
            console.error('Error details:', e);
            throw new Error(`Error creating budget: ${e.message}`);
        }

        const [budgets] = await connection.query(
            'SELECT BIN_TO_UUID(id) id, LimitAmount, StartDate, EndDate FROM Budget WHERE id = UUID_TO_BIN(?);',
            [uuid]
        )

        return budgets[0];
    }

    static async delete({ id }) {
        try {
            //Validador para un 404 not Found:
            const [budget] = await connection.query(
                'SELECT id FROM Budget WHERE id = UUID_TO_BIN(?);',
                [id]
            );

            if (budget.length === 0) return false

            const result = await connection.query(
                'DELETE FROM Budget WHERE id = UUID_TO_BIN(?);',
                [id]
            );
    
            if (result.affectedRows === 0) return false;
    
            return true;
        } catch (e) {
            console.error('Error deleting budget:', e);
            throw new Error('Error deleting budget');
        }
    }
    

    

    static async update({ id, input }) {
        // Verificar que el ID es un UUID válido
        if (!isUUID(id)) {
            throw new Error('El ID proporcionado no es un UUID válido');
        }
    
        const { LimitAmount, StartDate, EndDate } = input;
    
        try {
            // Buscar el presupuesto con el UUID (sin convertir a binario)
            const [budget] = await connection.query(
                `SELECT BIN_TO_UUID(id) id, LimitAmount, StartDate, EndDate 
                FROM Budget WHERE id = UUID_TO_BIN(?);`,
                [id]
            );
    
            // Si no se encuentra el presupuesto
            if (!budget) {
                throw new Error('No se encontró el presupuesto con ese ID');
            }
    
            // Crear el objeto con los datos actualizados, evitando pasar null en campos no proporcionados
            const updatedBudget = {
                LimitAmount: LimitAmount !== undefined ? LimitAmount : budget.LimitAmount,
                StartDate: StartDate !== undefined ? StartDate : budget.StartDate,
                EndDate: EndDate !== undefined ? EndDate : budget.EndDate
            };
    
            // Ejecutar la actualización
            const result = await connection.query(
                `UPDATE Budget
                SET LimitAmount = ?, StartDate = ?, EndDate = ?
                WHERE id = UUID_TO_BIN(?);`,
                [updatedBudget.LimitAmount, updatedBudget.StartDate, updatedBudget.EndDate, id]
            );
    
            if (result.affectedRows === 0) {
                throw new Error('No se pudo actualizar el presupuesto');
            }
    
            // Recuperar el presupuesto actualizado
            const [updatedBudgetResult] = await connection.query(
                `SELECT BIN_TO_UUID(id) id, LimitAmount, StartDate, EndDate
                FROM Budget WHERE id = UUID_TO_BIN(?);`,
                [id]
            );
    
            return updatedBudgetResult[0]; // Retornar el presupuesto actualizado
    
        } catch (e) {
            console.error('Error details:', e);
            throw new Error(`Error updating budget: ${e.message}`);
        }
    }
    
    
    
}

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

            if (true) {
                const del_Budget_Account = await connection.query(
                    'DELETE FROM Budget_Account WHERE budgetId = UUID_TO_BIN(?);',
                    [id]
                );
            }
    
            if (result.affectedRows === 0) return false;
    
            return true;
        } catch (e) {
            console.error('Error deleting budget:', e);
            throw new Error('Error deleting budget');
        }
    }
    

    // Revisar si se puede con mejores prácticas...
    // Pero ya funciona :)
    static async update({ id, input }) {
        try {
            // Verificar si el presupuesto existe antes de intentar actualizarlo
            const [existingBudget] = await connection.query(
                'SELECT * FROM Budget WHERE id = UUID_TO_BIN(?);',
                [id]
            );
    
            if (existingBudget.length === 0) return false
    
            // Construir la consulta dinámica de actualización
            const fields = Object.keys(input);
            const values = fields.map(field => input[field]);
    
            let setClause = fields.map(field => `${field} = ?`).join(', ');
    
            // Consulta SQL de actualización
            const sql = `UPDATE Budget SET ${setClause} WHERE id = UUID_TO_BIN(?)`;
            values.push(id);  // Añadimos el id al final de los valores para el WHERE
    
            // Ejecutar la consulta SQL de actualización
            const [result] = await connection.query(sql, values);
    
            // Verificar si se actualizaron filas
            if (result.affectedRows === 0) return false
    
            // Obtener el presupuesto actualizado
            const [updatedBudget] = await connection.query(
                'SELECT BIN_TO_UUID(id) id, LimitAmount, StartDate, EndDate FROM Budget WHERE id = UUID_TO_BIN(?);',
                [id]
            );

            return updatedBudget[0];
        } catch (error) {
            throw new Error('Error al actualizar el presupuesto');
        }
    }    
}


// NOTAS:
/* 
    CREATE : falta la conexión con Cuenta, coordinar eso.
    DELETE : Localmente puedo eliminar Budget_Account por Budget_id, pero no por Account_id (que ambos sean opcionales en la app final).
    El resto también deberían de tener una conexión con esos.

*/

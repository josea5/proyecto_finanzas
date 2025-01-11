import mysql from 'mysql2/promise'


//Configurar variables de entorno:
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'budgetsdb'
}

const connection = await mysql.createConnection(config);


export class BudgetModel{
    static async getAll ({LimitAmount}) {
        // todo
    }

    static async getById ({id}) {
        // todo
    }

    static async create ({input}) {
        // todo
    }

    static async delete ({id}) {
        // todo
    }

    static async update ({ id, input }) {
        // todo
    }
}

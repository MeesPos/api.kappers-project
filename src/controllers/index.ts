import { Request, Response, NextFunction } from 'express'

import mysql from 'mysql'

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'dbuser',
        password: '',
        database: 'my_db',
    })

    connection.connect()

    const sql = connection.query(
        'SELECT 1 + 1 AS solution',
        (err, rows, fields) => {
            if (err) throw err

            res.send('The solution is: ' + rows[0].solution)
        }
    )

    connection.end()
}

export default { getIndex }

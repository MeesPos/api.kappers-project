import { Request, Response, NextFunction } from 'express'
import connection from '../config/databaseConfig'

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) throw err

        res.send('The solution is: ' + rows[0].solution)
    })

    connection.end()
}

export default { getIndex }

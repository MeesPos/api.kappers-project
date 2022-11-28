import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import {
    getHairdresser,
    getAllHairdressers,
    postHairdresser,
} from './Hairdressers'

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('index page')
}

export default {
    getIndex,
    getAllHairdressers,
    getHairdresser,
    postHairdresser,
}

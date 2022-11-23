import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import getAllHairdressers from './getAllHairdressers'
const prisma = new PrismaClient()

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('index page')
}

export default { getIndex, getAllHairdressers }

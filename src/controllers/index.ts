import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { getHairdresser, getAllHairdressers } from './Hairdressers'

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('index page')
}

export default { getIndex, getAllHairdressers, getHairdresser }

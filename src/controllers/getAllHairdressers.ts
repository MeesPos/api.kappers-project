import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getAllHairdressers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const hairdressers = await prisma.hairdresser.findMany()
    res.json(hairdressers)
}

export default getAllHairdressers

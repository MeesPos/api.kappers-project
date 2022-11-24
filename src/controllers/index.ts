import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    const hairdressers = await prisma.hairdresser.findMany()
    res.json(hairdressers)
}

export default { getIndex }

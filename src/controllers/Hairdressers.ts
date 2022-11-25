import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllHairdressers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const hairdressers = await prisma.hairdresser.findMany()
    res.json(hairdressers)
}

export const getHairdresser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const hairdresser_id = +req.params.id

    const hairdresser = await prisma.hairdresser.findUnique({
        where: {
            id: hairdresser_id,
        },
    })
    if (!hairdresser) {
        res.status(404).send('The hairdresser you tried to find is not found')
    }

    res.json(hairdresser)
}

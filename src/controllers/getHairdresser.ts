import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getHairdresser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const haidresser_id = +req.params.id

    const hairdresser = await prisma.hairdresser.findUnique({
        where: {
            id: haidresser_id,
        },
    })
    if (!hairdresser) {
        res.send('The hairdresser you tried to find is not found')
    }

    res.json(hairdresser)
}

export default getHairdresser

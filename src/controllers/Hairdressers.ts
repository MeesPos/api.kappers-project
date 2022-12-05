import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

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
        return
    }

    res.json(hairdresser)
}

export const postHairdresser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password, availability } = req.body

    const hash = await bcrypt.hash(password, 10)

    try {
        //Upsert because we dont want to create two times the same record
        const hairdresser = await prisma.hairdresser.upsert({
            where: {
                email: email,
            },
            create: {
                name: name,
                email: email,
                password: hash,
                availability: availability,
            },
            update: {
                name: name,
                email: email,
                password: hash,
                availability: availability,
            },
        })
    } catch (error) {
        res.send(error)
        return
    }

    res.json({ succes: true })
}

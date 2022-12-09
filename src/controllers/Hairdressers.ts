import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

function exclude<Hairdresser, Key extends keyof Hairdresser>(
    hairdresser: Hairdresser,
    keys: Key[]
): Omit<Hairdresser, Key> {
    for (const key of keys) {
        delete hairdresser[key]
    }
    return hairdresser
}

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
    exclude(hairdresser, ['password'])

    res.json(hairdresser)
}

export const postUpdateHairdresser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    try {
        //Upsert because we dont want to create two times the same record
        const hairdresser = await prisma.hairdresser.update({
            where: {
                email: email,
            },
            data: {
                name: name,
                email: email,
                password: hash,
            },
        })
    } catch (error) {
        res.send(error)
        return
    }

    res.json({ succes: true })
}

export const postNewHairdresser = async (
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
            },
            update: {
                name: name,
                email: email,
                password: hash,
            },
        })
    } catch (error) {
        res.send(error)
        return
    }

    res.json({ succes: true })
}

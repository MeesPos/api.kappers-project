import { Hairdresser, PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { Availability, StartEndTime } from '../interfaces/hairdresser.interface'
import fs from 'fs'

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
    const { name, email, password, image } = req.body

    if (!name || !email || !password) {
        res.status(400).send('name, email or password are required')
        return
    }

    const hash = await bcrypt.hash(password, 10)
    const imageName = Math.ceil(Math.random() * 1000) + '.png'
    if (image) {
        const base64Data = image.replace(/^data:([A-Za-z-+/]+);base64,/, '')
        fs.writeFileSync('./images/' + imageName, base64Data, {
            encoding: 'base64',
        })
    }
    try {
        const hairdresser = await prisma.hairdresser.upsert({
            where: {
                email: email,
            },
            create: {
                name: name,
                email: email,
                password: hash,
                image: imageName,
            },
            update: {
                name: name,
                email: email,
                password: hash,
                image: imageName,
            },
        })
    } catch (error) {
        res.send(error)
        return
    }

    res.json({ succes: true })
}
export const addDefaultAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const hairdresser_id = +req.params.id
    const availability = req.body as Availability

    for (const day of Object.keys(availability)) {
        const dataOfDay = availability[day as unknown as keyof Availability]
        const exist = await prisma.defaultTimes.findMany({
            where: {
                hairdresser_id: {
                    equals: hairdresser_id,
                },
                day_of_the_week: {
                    equals: day,
                },
            },
        })
        if (exist.length > 0) {
            const update = await prisma.defaultTimes.updateMany({
                where: {
                    hairdresser_id: {
                        equals: hairdresser_id,
                    },
                    day_of_the_week: {
                        equals: day,
                    },
                },
                data: {
                    day_of_the_week: day,
                    start_time: dataOfDay?.start_time,
                    end_time: dataOfDay?.end_time,
                    pauzes: dataOfDay?.pauses,
                },
            })
        } else {
            const create = await prisma.defaultTimes.create({
                data: {
                    hairdresser_id: hairdresser_id,
                    day_of_the_week: day,
                    start_time: dataOfDay?.start_time,
                    end_time: dataOfDay?.end_time,
                    pauzes: dataOfDay?.pauses,
                },
            })
        }
    }

    res.json({ succes: true })
}

export const getDefaultAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const hairdresser_id = +req.params.id

    const dbDefaultTimes = await prisma.defaultTimes.findMany({
        where: {
            hairdresser_id: hairdresser_id,
        },
    })
    if (dbDefaultTimes.length === 0) {
        res.status(404).send(
            `Defaulttimes of hairdresser ${hairdresser_id} not found`
        )
        return
    }
    const defaultTimes: Availability = {}
    dbDefaultTimes.forEach(
        (day) =>
            (defaultTimes[
                day.day_of_the_week as unknown as keyof Availability
            ] = {
                start_time: day.start_time!,
                end_time: day.end_time!,
                pauses: day.pauzes,
            })
    )

    res.json(defaultTimes)
}

import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAvailability = async (req: Request, res: Response) => {
    const hairdresser_id = +req.params.id
    const hairdresser = await prisma.hairdresser.findUnique({
        where: {
            id: hairdresser_id,
        },
        include: {
            default_times: true,
            changed_times: {
                where: {
                    date: {
                        gte: String(new Date().getTime() / 1000),
                        lte: String(new Date().getTime() / 1000 + (28 * 24 * 60 * 60))
                    }
                }
            }
        }
    })

    console.log(await hairdresser);
}
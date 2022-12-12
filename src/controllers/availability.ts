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

    // Dit moet gevuld worden met de afspraken die de kapper heeft in de komende 28 dagen. Dit moet nog gemaakt worden.
    const appointments = [];

    const dates = [];

    for (let i = 1; i < 29; i++) {
        const date = new Date();

        date.setDate(date.getDate() + i)

        const newDate = date.toLocaleDateString().replace(/\//g, '-')

        // @ts-ignore
        const changed_time = hairdresser?.changed_times.find(item => new Date(item.date * 1000).toLocaleDateString().replace(/\//g, '-') === newDate);

        let available = false;

        available = changed_time !== undefined && (changed_time?.start_time !== null || changed_time?.end_time !== null);

        if (changed_time === undefined) {
            // @ts-ignore
            const default_time = hairdresser?.default_times.find(item => item.day_of_the_week === date.getDate())

            available = default_time !== undefined;
        }
        
        dates.push({
            date: newDate,
            available: available
        });
    }

    res.json(dates);
}
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

    // Dit moet gevuld worden met de data die komt, maar die is nu nog niet gemaakt
    const treatmentTime = 30;

    const dates = [];

    for (let i = 1; i < 29; i++) {
        const date = new Date();

        date.setDate(date.getDate() + i)

        const newDate = date.toLocaleDateString().replace(/\//g, '-')

        const changed_time = hairdresser?.changed_times.find(item => {
            // @ts-ignore
            const milliseconds = item.date * 1000;

            const date = new Date(milliseconds).toLocaleDateString().replace(/\//g, '-');

            return date === newDate
        })

        let available = false;


        if (changed_time !== undefined && (changed_time?.start_time !== null || changed_time?.end_time !== null)) {
            available = true;
        }

        if (changed_time === undefined) {
            const default_time = hairdresser?.default_times.find(item => {
                // @ts-ignore
                return item.day_of_the_week === date.getDate()
            })

            if (default_time !== undefined) {
                available = true;
            }
        }
        
        dates.push({
            date: newDate,
            available: available
        });
    }

    res.json(dates);
}
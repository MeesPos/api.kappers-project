import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAvailableDates = async (req: Request, res: Response) => {
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
                        lte: String(
                            new Date().getTime() / 1000 + 28 * 24 * 60 * 60
                        ),
                    },
                },
            },
        },
    })

    // Dit moet gevuld worden met de afspraken die de kapper heeft in de komende 28 dagen. Dit moet nog gemaakt worden.
    const appointments = []

    const dates = []

    for (let i = 1; i < 29; i++) {
        const date = new Date()

        date.setDate(date.getDate() + i)

        const newDate = date.toLocaleDateString().replace(/\//g, '-')

        // @ts-ignore
        const changed_time = hairdresser?.changed_times.find(
            (item) =>
                new Date(+item.date * 1000)
                    .toLocaleDateString()
                    .replace(/\//g, '-') === newDate
        )

        let available = false

        available =
            changed_time !== undefined &&
            (changed_time?.start_time !== null ||
                changed_time?.end_time !== null)

        if (changed_time === undefined) {
            // @ts-ignore
            const default_time = hairdresser?.default_times.find(
                (item) => +item?.day_of_the_week === date?.getDate()
            )

            available = default_time !== undefined
        }

        dates.push({
            date: newDate,
            available: available,
        })
    }

    res.json(dates)
}

export const getAvailabilityOnDate = async (req: Request, res: Response) => {
    const hairdresser_id = +req.params.id
    const date = req.params.date

    const [day, month, year] = date.split('-')

    const convertedDate = new Date(+year, Number(month) - 1, +day, 1)

    const hairdresser = await prisma.hairdresser.findUnique({
        where: {
            id: hairdresser_id,
        },
        include: {
            default_times: {
                where: {
                    day_of_the_week: String(convertedDate.getUTCDay()),
                },
            },
            changed_times: {
                where: {
                    date: String(convertedDate.getTime() / 1000),
                },
            },
        },
    })

    // Dit moet gevuld worden met de afspraken die de kapper heeft in de komende 28 dagen. Dit moet nog gemaakt worden.
    const appointments = []

    // Dit moet gevuld worden met de tijd dat een behandeling duurt, maar dit moet nog gemaakt worden.
    const treatmentTime = 30

    const times = []

    let secMinBeginTime, secMinEndTime

    if (hairdresser?.changed_times.length !== 0) {
        secMinBeginTime = hairdresser?.changed_times[0]
            .start_time!.toString()
            .split(':')
        secMinEndTime = hairdresser?.changed_times[0]
            .end_time!.toString()
            .split(':')
    } else {
        secMinBeginTime = hairdresser?.default_times[0]
            .start_time!.toString()
            .split(':')
        secMinEndTime = hairdresser?.default_times[0]
            .end_time!.toString()
            .split(':')
    }

    // @ts-ignore
    let beginTime = new Date(
        +year,
        Number(month) - 1,
        +day,
        Number(secMinBeginTime![0]),
        Number(secMinBeginTime![1])
    )
    // @ts-ignore
    let endTime = new Date(
        +year,
        Number(month) - 1,
        +day,
        Number(secMinEndTime![0]),
        Number(secMinEndTime![1])
    )

    const minutes = Math.round(
        // @ts-ignore
        Math.abs(endTime - beginTime) / (60 * 1000)
    )

    for (let i = 1; i <= minutes / treatmentTime; i++) {
        const startTime = beginTime.getHours() + ':' + ('0'+beginTime.getMinutes()).slice(-2);
        beginTime = new Date(beginTime.getTime() + treatmentTime * 60000)
        const formattedEndTime = beginTime.getHours() + ':' + ('0'+beginTime.getMinutes()).slice(-2);

        times.push({
            start_time: startTime,
            end_time: formattedEndTime,
        })
    }

    res.json(times)
}

import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { Appointment } from '../interfaces/appointment.interface'

const prisma = new PrismaClient()

export const newAppointment = async (req: Request, res: Response) => {
    const body: Appointment = req.body

    const personalData = await prisma.personalDatas.create({
        data: {
            name: body.personalData.name,
            email: body.personalData.email,
            phone_number: body.personalData.phone_number!,
            note: body.personalData.note,
        },
    })

    const payment = await prisma.payments.create({
        data: {
            price: 20,
            payment_method: 'in_store',
            student_discount: false,
        },
    })

    await prisma.appointments.create({
        data: {
            date: body.date,
            start_time: body.time.start_time,
            end_time: body.time.end_time,
            hairdresser_id: body.hairdresser.id,
            treatment_id: 1,
            personal_data_id: personalData.id,
            payment_id: payment.id,
        },
    })

    res.json({ success: true })
}

export const getAppointments = async (req: Request, res: Response) => {
    const appointments = await prisma.appointments.findMany()

    console.log(appointments)

    res.json(appointments)
}

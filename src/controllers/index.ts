import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import {
    getHairdresser,
    getAllHairdressers,
    postHairdresser,
} from './Hairdressers'
import { login } from './auth/login'
import { sendMail, resetPassword } from './auth/forgotPassword'

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('index page')
}
export default {
    getIndex,
    getAllHairdressers,
    postHairdresser,
    getHairdresser,
    login,
    sendMail,
    resetPassword,
}

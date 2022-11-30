import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { getHairdresser, getAllHairdressers } from './Hairdressers'
import { login } from './auth/login';
import { sendMail, resetPassword } from './auth/forgotPassword'

const prisma = new PrismaClient();

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('index page')
}

export default { getIndex, getAllHairdressers, getHairdresser, login, sendMail, resetPassword }
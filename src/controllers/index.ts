import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
<<<<<<< HEAD
const prisma = new PrismaClient()
import {
    getHairdresser,
    getAllHairdressers,
    postHairdresser,
} from './Hairdressers'
=======
import { getHairdresser, getAllHairdressers } from './Hairdressers'
import { login } from './auth/login';
import { sendMail, resetPassword } from './auth/forgotPassword'

const prisma = new PrismaClient();
>>>>>>> 86cc6ae1580aa550c757b1545e1c60396231ecb1

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('index page')
}

<<<<<<< HEAD
export default {
    getIndex,
    getAllHairdressers,
    getHairdresser,
    postHairdresser,
}
=======
export default { getIndex, getAllHairdressers, getHairdresser, login, sendMail, resetPassword }
>>>>>>> 86cc6ae1580aa550c757b1545e1c60396231ecb1

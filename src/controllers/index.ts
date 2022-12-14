import { Request, Response, NextFunction } from 'express'
import {
    getHairdresser,
    getAllHairdressers,
    postUpdateHairdresser,
    postNewHairdresser,
} from './Hairdressers'
import { login } from './auth/login'
import { sendMail, resetPassword } from './auth/forgotPassword'
import { getAvailableDates, getAvailabilityOnDate } from './availability'

const getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('index page')
}
export default {
    getIndex,
    getAllHairdressers,
    postUpdateHairdresser,
    postNewHairdresser,
    getHairdresser,
    login,
    sendMail,
    resetPassword,
    getAvailableDates,
    getAvailabilityOnDate
}

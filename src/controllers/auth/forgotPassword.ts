import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { transporter } from '../../utils/mailer'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const sendMail = async (req: Request, res: Response) => {
    const { email } = req.body

    const existingUser = await prisma.hairdresser.findFirst({
        where: {
            email: email,
        },
    })

    if (!existingUser) {
        /*
        We do not want to indicate that the user does not exist, this is a security issue that we must avoid.

        SOURCE - https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
        */
        res.status(200).send('Email sent')

        return
    }

    const jwt_token = jwt.sign(
        {
            email: existingUser.email,
            name: existingUser.name,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: 12 * 60 * 60,
        }
    )

    const url =
        process.env.FRONTEND_URL +
        '/reset-password/' +
        jwt_token +
        '/' +
        existingUser.email

    transporter.sendMail(
        {
            from: process.env.MAIL_FROM,
            to: existingUser.email,
            subject: 'Password reset',
            html: `Hello, <br><br>Reset your password to click on this button:<br> <a href="${url}"><button>Reset wachtwoord</button></a><br><br>Or click on this URL:<br><a href="${url}">${url}</a>`,
        },
        () => {
            res.status(200).send('Email sent')
        }
    )
}

export const resetPassword = async (req: Request, res: Response) => {
    const { email, password, token } = req.body

    const existingUser = await prisma.hairdresser.findFirst({
        where: {
            email: email,
        },
    })

    if (!existingUser) {
        /*
        We do not want to indicate that the user does not exist, this is a security issue that we must avoid.

        SOURCE - https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
        */
        res.status(498).send('Token is invalid')

        return
    }

    let errors = [];

    try {
        if (password.length < 8 ) {
            errors.push('Het wachtwoord moet langer dan 8 tekens zijn');
        }

        if (password.replace(/[^0-9]/g, '').length < 1) {
            errors.push('Het wachtwoord moet minimaal 1 cijfer bevatten')
        }

        if (password.replace(/[^A-Z]/g, '').length < 1) {
            errors.push('Het wachtwoord moet minimaal 1 hoofdletter bevatten');
        }

        if (errors.length !== 0) {
            res.status(400)
               .json(errors);

            return;
        }

        // @ts-ignore
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // @ts-ignore
        if (decoded?.email !== existingUser?.email) {
            res.status(498).send('Token is invalid')

            return
        }

        await prisma.hairdresser.update({
            where: {
                email: existingUser.email,
            },
            data: {
                password: await bcrypt.hash(password, 10),
            },
        })

        res.send('Password updated')
    } catch (err) {
        res.status(498).send('Token is invalid')

        return
    }
}

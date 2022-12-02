import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { transporter } from "../../utils/mailer";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const sendMail = async (
    req: Request,
    res: Response
) => {
    const { email } = req.body;

    let existingUser = await prisma.hairdresser.findFirst({
        where: {
            email: email
        }
    });

    if (existingUser === null) {
        /*
        We do not want to indicate that the user does not exist, this is a security issue that we must avoid.

        SOURCE - https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
        */
        res.status(200).send('Email sent');

        return;
    }

    const jwt_token = jwt.sign({
        email: existingUser.email,
        name: existingUser.name
    }, process.env.JWT_SECRET!, {
        expiresIn: 12 * 60 * 60
    });

    const url = process.env.FRONTEND_URL + '/reset-password/' + jwt_token + '/' + existingUser.email;

    transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: existingUser.email,
        subject: "Password reset",
        html: `Hello, <br><br>Reset your password to click on this button:<br> <a href="${url}"><button>Reset wachtwoord</button></a><br><br>Or click on this URL:<br><a href="${url}">${url}</a>`
    }, () => {
        res.status(200).send('Email sent');
    })
}

export const resetPassword = async (
    req: Request,
    res: Response
) => {
    const { email, password, token } = req.body;

    let existingUser = await prisma.hairdresser.findFirst({
        where: {
            email: email
        }
    });

    if (existingUser === null) {
        /*
        We do not want to indicate that the user does not exist, this is a security issue that we must avoid.

        SOURCE - https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
        */
        res.status(498).send('Token is invalid');

        return;
    }

    try {
        // @ts-ignore
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // @ts-ignore
        if (decoded?.email !== existingUser?.email) {
            res.status(498).send('Token is invalid');

            return;
        }

        const updatedUser = await prisma.hairdresser.update({
            where: {
                email: existingUser.email
            },
            data: {
                password: password
            }
        })

        res.send('Password updated');
    } catch (err) {
        res.status(498).send('Token is invalid');

        return;
    }
}
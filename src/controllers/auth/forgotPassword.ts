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
        res.send('Email sent');

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
        subject: "Password rest",
        text: "test",
        html: `Hello, <br><br>Reset your password to click on this button:<br> <a href="${url}"><button>Reset wachtwoord</button></a><br><br>Or click on this URL:<br><a href="${url}">${url}</a>`
    }, (error, info) => {
        if (error) {
            console.log(error);

            res.json(error)

            return;
        }

        res.status(200).send({
            message: "Mail send",
            message_id: info.messageId
        })
    })
}
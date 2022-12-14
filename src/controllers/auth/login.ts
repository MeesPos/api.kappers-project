import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body

    const existingUser = await prisma.hairdresser.findFirst({
        where: {
            email: email,
        },
    })

    if (
        !existingUser ||
        !(await bcrypt.compare(password, existingUser?.password))
    ) {
        // @ts-ignore
        Promise.resolve()
            .then(() => {
                throw new Error('invalid credentials')
            })
            .catch(next)

        res.status(401)

        return
    }

    const user = {
        email: existingUser.email,
        name: existingUser.name,
    }

    const accessToken = jwt.sign(user, process.env.JWT_SECRET!, {
        expiresIn: 12 * 60 * 60,
    })

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: 12 * 60 * 60,
    })

    res.json({
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
    })
}

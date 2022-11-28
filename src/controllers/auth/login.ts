import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body);
    const { email, password } = req.body;

    let existingUser = await prisma.hairdresser.findFirst({
        where: {
            email: email
        }
    })

    console.log(existingUser, password, email);

    if (existingUser === null || existingUser.password != password) {
        Promise.resolve().then(() => {
            throw new Error('invalid credentials');
        }).catch(next);

        res.status(401);
        
        return;
    }

    res.json(existingUser);
}
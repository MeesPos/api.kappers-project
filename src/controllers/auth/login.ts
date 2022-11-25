import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let existingUser = await prisma.hairdresser.findFirst({
        where: {
            
        }
    })

    res.json(req.body);
}
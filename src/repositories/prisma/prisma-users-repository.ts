import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import UseCaseIntermidea from "../abstract-user-repository";
import { promise } from "zod";

export class RegisterRepository implements UseCaseIntermidea {
    async findByEmail(email: string): Promise<User | null> {
        try {
            const response = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })
            return Promise.resolve(response)
        } catch (error) {
            console.error("Erro ao buscar usuário por email:", error);
            return null
        }
    }
    async create({ name, email, password_hush }: Prisma.UserCreateInput) {
        const response = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password_hush: password_hush
            }
        })
        return response
    }
}
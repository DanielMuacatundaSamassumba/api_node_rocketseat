import { RegisterRepository } from "@/repositories/prisma/prisma-users-repository"
import AuthUseCase from "@/use-cases/auth"
import AuthError from "@/use-cases/errors/user-auth-error"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
export default async function Auth(req: FastifyRequest, res: FastifyReply) {
    try {
        const userDataAuthSchema = z.object({
            email: z.string().nonempty("campo obrigatorio"),
            password: z.string().nonempty("campo obrigatorio"),
        })

        const { email, password } = userDataAuthSchema.parse(req.body)
        const PrismaUserRepositary = new RegisterRepository()
        const useCaseAuth = new AuthUseCase(PrismaUserRepositary)

      
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(400).send({
                massage: error.message
            })
        }
    }

}
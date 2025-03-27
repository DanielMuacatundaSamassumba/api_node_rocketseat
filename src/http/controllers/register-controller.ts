import { FastifyRequest, FastifyReply } from "fastify"
import { z, ZodError } from "zod"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import RegisterUsecase from "@/use-cases/register"
import { RegisterRepository } from "@/repositories/prisma/prisma-users-repository"
import UserAlreadyExist from "@/use-cases/errors/user-already-exists-error"
export default async function createUser(request: FastifyRequest, replay: FastifyReply) {
    const userDataSchema = z.object({
        name: z.string().nonempty("campo obrigatório "),
        email: z.string().nonempty("campo obrigatório "),
        password_hush: z.string().nonempty("campo obrigatório ")
    })

    try {
        const { name, email, password_hush } = userDataSchema.parse(request.body)
        const password = await hash(password_hush, 6)
        const registerrepository = new RegisterRepository()
        const registerUsecase = new RegisterUsecase(registerrepository)
        await registerUsecase.execute({
            name,
            password,
            email
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return replay.status(400).send(error)
        }
        if (error instanceof UserAlreadyExist) {
            return replay.status(409).send(error)
        }
        
        return error
    }

}
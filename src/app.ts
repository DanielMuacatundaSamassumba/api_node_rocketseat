import fastify from "fastify"
import { prisma } from "@/lib/prisma"
import createUser from "./http/controllers/register-controller"
import { error } from "console"
import { ZodError } from "zod"
import Auth from "./http/controllers/auth-controller"
export const app = fastify()

app.post("/api/user/create", createUser)
app.post("/api/user/auth", Auth)
app.setErrorHandler((error, request, replay) => {
    if (error instanceof ZodError) {
        return replay
            .status(409).send({
                message: "Erro de Validação",
                issues: error.formErrors
            })
    }
})



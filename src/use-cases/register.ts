import { prisma } from "@/lib/prisma"
import UseCaseIntermidea from "@/repositories/abstract-user-repository"
import { RegisterRepository } from "@/repositories/prisma/prisma-users-repository"
import UserAlreadyExist from "./errors/user-already-exists-error"
interface registerDataUseCase {
    name: string,
    email: string,
    password: string
}
export default class RegisterUsecase {
    constructor(private prismaRepository: UseCaseIntermidea) { }

    async execute({ name, email, password }: registerDataUseCase) {
        const emailAlreadyExist = await this.prismaRepository.findByEmail(email)
        if (emailAlreadyExist) {
            throw new UserAlreadyExist()
        }

        const user = await this.prismaRepository.create({
            name: name,
            email: email,
            password_hush: password,
        })
        return user
    }
}
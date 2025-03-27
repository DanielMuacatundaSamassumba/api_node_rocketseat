import UseCaseIntermidea from "@/repositories/abstract-user-repository";
import AuthError from "./errors/user-auth-error";
import { compare } from "bcryptjs";
interface AuthData {
    email: string,
    password: string
}
export default class AuthUseCase {
    constructor(private RepositoryUsrer: UseCaseIntermidea) {

    }
    async execute({ email, password}: AuthData) {
        const user = await this.RepositoryUsrer.findByEmail(email)

        if (!user) {
            throw new AuthError()
        }

        const doespasswordmatch = await compare(user.password_hush, password)
        if (!doespasswordmatch) {
            throw new AuthError()
        }
        return user
    }
}
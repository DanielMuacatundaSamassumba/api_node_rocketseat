import { Prisma, User } from "@prisma/client";

export default interface UseCaseIntermidea {
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput>
}
import { test, expect, it } from "vitest"
import RegisterUsecase from "./register"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { describe } from "node:test"
describe("Register useCase", () => {
     it("in this setion we are testing password hash", async () => {
          const usecaseRegister = new RegisterUsecase({
               async create(data) {
                    return {
                         name: data.name,
                         email: data.email,
                         password_hush: data.password_hush,
                         createAt: new Date()

                    }
               },

               async findByEmail(email) {
                    return null
               },
          })
          const user = await usecaseRegister.execute({
               name: "daniel",
               email: "danielsamassumba@gmail.com",
               password: "1322342355435"
          })
          const ispasswordhashed = await compare("1322342355435", user.password_hush)
          expect(ispasswordhashed).toBe(true)
     })
})
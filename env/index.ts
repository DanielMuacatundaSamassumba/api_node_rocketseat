import { env } from "process"
import { z } from "zod"

const envSchema = z.object({
     NODE_ENV: z.enum(["dev", "test", "prodation"]).default("dev"),
     PORT: z.coerce.number().default(3333)
})


const _env = envSchema.safeParse(process.env)

 if(_env.success === false){
   console.log("❌Invalid envarioment variables", _env.error.format)
   throw  new Error("Invalid envarioment variebles")
 }

export const enV = _env.data
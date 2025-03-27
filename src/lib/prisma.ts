import { PrismaClient } from "@prisma/client";
import { enV } from "env";
export const prisma = new PrismaClient({
    log: ["query"]
})
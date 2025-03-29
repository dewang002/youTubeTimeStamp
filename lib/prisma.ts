import { PrismaClient } from "@prisma/client";

let prisma : PrismaClient;

declare global {
    namespace NodeJs {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

declare const global: NodeJs.Global & typeof globalThis;

if( process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else{
    if(!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma
}

export default prisma;
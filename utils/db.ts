/**
 * The above TypeScript code defines a singleton function for creating a Prisma client instance and
 * ensures only one instance is created and shared globally.
 * @returns A singleton instance of the PrismaClient is being returned.
 */
// we won't directly grab the prisma from the package instead we grab the db from this file
// this checks for previously made instances
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
})

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;//prisma holds the instance of our db

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// this file does check if there are any previous instances of the prisma of there are then it uses them otherwise
// it creates a new one
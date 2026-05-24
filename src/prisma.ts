import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/generated/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const db = new URL(process.env.DATABASE_URL!);
console.log('host:', db.hostname);
console.log('port:', db.port);
console.log('user:', db.username);
console.log('db:', db.pathname.slice(1));
const adapter = new PrismaMariaDb({
  host: db.hostname,
  port: parseInt(db.port),
  user: db.username,
  password: db.password,
  database: db.pathname.slice(1),
  allowPublicKeyRetrieval: true,
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

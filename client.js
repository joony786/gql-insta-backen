import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({
    log: ['query', 'warn', 'error', 'info'],
  });


export default client;
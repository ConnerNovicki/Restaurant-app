import startServer from './startServer'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
startServer(prisma);

import { PrismaClient } from "@prisma/client";

class Prisma {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }
}

export default Prisma;

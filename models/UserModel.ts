import Prisma from './Prisma';

class UserModel extends Prisma {
  constructor() {
    super();
  }

  async getUsers() {
    await this.prisma.$connect();
    return this.prisma.user.findMany();
  }

  async getUser(input) {
    await this.prisma.$connect();
    let user;
    if (input.includes('@')) {
      user = this.prisma.user.findFirst({
        where: {
          email: input,
        },
      });
    } else {
      user = this.prisma.user.findFirst({
        where: {
          username: input,
        },
      });
    }
    return user;
  }

  async registerUser(
    email: string,
    password: string,
    name: string,
    username: string
  ) {
    await this.prisma.$connect();

    await this.prisma.user.create({
      data: {
        email,
        password,
        name,
        username,
        isAdmin: false,
      },
    });

    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async getSingers() {
    await this.prisma.$connect();
    return this.prisma.user.findMany({
      where: {
        isAdmin: 0,
      },
    });
  }
}

export default UserModel;

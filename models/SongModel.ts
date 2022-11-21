import Prisma from "./Prisma";

class SongModel extends Prisma {
  constructor() {
    super();
  }

  async getSongs() {
    await this.prisma.$connect();
    const allSongs = await this.prisma.song.findMany();
    return allSongs;
  }
}

export default SongModel;

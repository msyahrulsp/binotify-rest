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

  async getSongBySingerID(singerid) {
    await this.prisma.$connect();
    const singerSongs = await this.prisma.song.findMany({
      include: {
        user: true
      },
      where: {
        user: {
          user_id: parseInt(singerid)
        }
      }
    })
    return singerSongs
  }
}

export default SongModel;

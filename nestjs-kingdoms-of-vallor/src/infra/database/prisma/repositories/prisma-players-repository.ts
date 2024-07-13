import { Injectable } from '@nestjs/common';

import { PlayersRepository } from '@/domain/game/application/repositories/players-repository';
import { Player } from '@/domain/game/enterprise/entities/player';

import { PrismaPlayerMapper } from '../mappers/prisma-palyer-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPlayersRepository implements PlayersRepository {
  constructor(private prisma: PrismaService) {}
  async findByEmail(email: string): Promise<Player | null> {
    const player = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!player) {
      return null;
    }

    return PrismaPlayerMapper.toDomain(player);
  }

  async findByUsername(username: string): Promise<Player | null> {
    const player = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!player) {
      return null;
    }

    return PrismaPlayerMapper.toDomain(player);
  }

  async create(player: Player): Promise<void> {
    const data = PrismaPlayerMapper.toPrisma(player);

    await this.prisma.user.create({
      data,
    });
  }
}

import { Module } from '@nestjs/common';

import { PlayersRepository } from '@/domain/game/application/repositories/players-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaPlayersRepository } from './prisma/repositories/prisma-players-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: PlayersRepository,
      useClass: PrismaPlayersRepository,
    },
  ],
  exports: [PrismaService, PlayersRepository],
})
export class DatabaseModule {}

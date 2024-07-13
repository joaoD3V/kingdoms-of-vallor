import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Player, PlayerProps } from '@/domain/game/enterprise/entities/player';
import { Username } from '@/domain/game/enterprise/entities/value-objects/username';
import { PrismaPlayerMapper } from '@/infra/database/prisma/mappers/prisma-palyer-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makePlayer(
  override: Partial<PlayerProps> = {},
  id?: UniqueEntityID
) {
  const player = Player.create(
    {
      name: faker.person.fullName(),
      username: Username.createFromText(faker.internet.userName()),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatar: faker.image.url(),
      isVerified: true,
      currentLevel: Number(faker.string.numeric({ length: 3 })),
      experienceAmount: Number(faker.string.numeric({ length: 6 })),
      masteryAmount: Number(faker.string.numeric({ length: 3 })),
      ...override,
    },
    id
  );

  return player;
}

@Injectable()
export class PlayerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPlayer(data: Partial<PlayerProps> = {}): Promise<Player> {
    const player = makePlayer(data);

    await this.prisma.user.create({
      data: PrismaPlayerMapper.toPrisma(player),
    });

    return player;
  }
}

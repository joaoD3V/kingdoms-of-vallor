import { Prisma, User as PrismaUser } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Player } from '@/domain/game/enterprise/entities/player';
import { Username } from '@/domain/game/enterprise/entities/value-objects/username';

export class PrismaPlayerMapper {
  static toDomain(raw: PrismaUser): Player {
    return Player.create(
      {
        name: raw.name,
        username: Username.createFromText(raw.username),
        email: raw.email,
        password: raw.password,
        avatar: raw.avatar_url,
        isVerified: raw.is_verified,
        currentLevel: raw.current_level,
        experienceAmount: raw.experience_amount,
        masteryAmount: raw.mastery_amount,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(player: Player): Prisma.UserUncheckedCreateInput {
    return {
      id: player.id.toString(),
      name: player.name,
      username: player.username.value,
      email: player.email,
      password: player.password,
      avatar_url: player.avatar,
      is_verified: player.isVerified,
      current_level: player.currentLevel,
      experience_amount: player.experienceAmount,
      mastery_amount: player.masteryAmount,
    };
  }
}

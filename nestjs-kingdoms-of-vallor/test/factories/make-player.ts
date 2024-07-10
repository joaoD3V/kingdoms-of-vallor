import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Player, PlayerProps } from '@/domain/game/enterprise/entities/player';
import { Username } from '@/domain/game/enterprise/entities/value-objects/username';

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
      currentLevel: Number(faker.string.numeric({ length: 3 })),
      experienceAmount: Number(faker.string.numeric({ length: 6 })),
      masteryAmount: Number(faker.string.numeric({ length: 3 })),
      ...override,
    },
    id
  );

  return player;
}

import { DomainEvents } from '@/core/events/domain-events';
import { PlayersRepository } from '@/domain/game/application/repositories/players-repository';
import { Player } from '@/domain/game/enterprise/entities/player';

export class InMemoryPlayersRepository implements PlayersRepository {
  public items: Player[] = [];

  async findByEmail(email: string) {
    const player = this.items.find((item) => item.email === email);

    if (!player) {
      return null;
    }

    return player;
  }

  async findByUsername(username: string): Promise<Player | null> {
    const player = this.items.find((item) => item.username.value === username);

    if (!player) {
      return null;
    }

    return player;
  }

  async create(player: Player) {
    this.items.push(player);

    DomainEvents.dispatchEventsForAggregate(player.id);
  }
}

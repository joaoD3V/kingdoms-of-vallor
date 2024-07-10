import { Player } from '../../enterprise/entities/player';

export abstract class PlayersRepository {
  abstract findByEmail(email: string): Promise<Player | null>;
  abstract findByUsername(username: string): Promise<Player | null>;
  abstract create(player: Player): Promise<void>;
}

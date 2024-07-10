import { makePlayer } from 'test/factories/make-player';
import { InMemoryPlayersRepository } from 'test/repositories/in-memory-players-repository';

import { Username } from '../../enterprise/entities/value-objects/username';
import { GetPlayerByUsernameUseCase } from './get-player-by-username';

let inMemoryPlayersRepository: InMemoryPlayersRepository;
let sut: GetPlayerByUsernameUseCase;

describe('Get Player By Username', () => {
  beforeEach(() => {
    inMemoryPlayersRepository = new InMemoryPlayersRepository();
    sut = new GetPlayerByUsernameUseCase(inMemoryPlayersRepository);
  });

  it('should be able to get a player by username', async () => {
    const newPlayer = makePlayer({
      username: Username.create('example_player'),
    });

    inMemoryPlayersRepository.create(newPlayer);

    const result = await sut.execute({
      username: 'example_player',
    });

    expect(result.isRight()).toBeTruthy();

    if (result.isRight()) {
      expect(result.value.player.username).toEqual(newPlayer.username);
    }

    expect(result.value).toMatchObject({
      player: expect.objectContaining({
        username: newPlayer.username,
      }),
    });
  });
});

import { FakeHasher } from 'test/cryptography/fake-hasher';
import { InMemoryPlayersRepository } from 'test/repositories/in-memory-players-repository';

import { RegisterPlayerUseCase } from './register-player';

let inMemoryPlayersRepository: InMemoryPlayersRepository;
let fakeHasher: FakeHasher;
let sut: RegisterPlayerUseCase;

describe('Register Player', () => {
  beforeEach(() => {
    inMemoryPlayersRepository = new InMemoryPlayersRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterPlayerUseCase(inMemoryPlayersRepository, fakeHasher);
  });

  it('should be able to register a new player', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      player: inMemoryPlayersRepository.items[0],
    });
  });

  it('should hash player password uppon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const hashedPassword = await fakeHasher.hash('123456');

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryPlayersRepository.items[0].password).toEqual(hashedPassword);
  });
});

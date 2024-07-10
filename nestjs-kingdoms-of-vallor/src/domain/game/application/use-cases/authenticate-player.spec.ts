import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makePlayer } from 'test/factories/make-player';
import { InMemoryPlayersRepository } from 'test/repositories/in-memory-players-repository';

import { Username } from '../../enterprise/entities/value-objects/username';
import { AuthenticatePlayerUseCase } from './authenticate-player';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

let inMemoryPlayersRepository: InMemoryPlayersRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticatePlayerUseCase;

describe('Authenticate Player', () => {
  beforeEach(() => {
    inMemoryPlayersRepository = new InMemoryPlayersRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticatePlayerUseCase(
      inMemoryPlayersRepository,
      fakeHasher,
      fakeEncrypter
    );
  });

  it('should be able to authenticate a player with email', async () => {
    const player = makePlayer({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryPlayersRepository.items.push(player);

    const result = await sut.execute({
      entry: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should be able to authenticate a player with username', async () => {
    const player = makePlayer({
      username: Username.createFromText('John Doe'),
      password: await fakeHasher.hash('123456'),
    });

    inMemoryPlayersRepository.items.push(player);

    const result = await sut.execute({
      entry: 'john_doe',
      password: '123456',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not be able to authenticate a player with invalid username', async () => {
    const player = makePlayer({
      username: Username.createFromText('John Doe'),
      password: await fakeHasher.hash('123456'),
    });

    inMemoryPlayersRepository.items.push(player);

    const result = await sut.execute({
      entry: 'john_doee',
      password: '123456',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });

  it('should not be able to authenticate a player with invalid email', async () => {
    const player = makePlayer({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryPlayersRepository.items.push(player);

    const result = await sut.execute({
      entry: 'johndoee@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});

import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';

import { Encrypter } from '../cryptography/encrypter';
import { HashComparer } from '../cryptography/hash-comparer';
import { PlayersRepository } from '../repositories/players-repository';
import { WrongCredentialsError } from './errors/wrong-credentials-error';

interface AuthenticatePlayerUseCaseRequest {
  entry: string;
  password: string;
}

type AuthenticatePlayerUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticatePlayerUseCase {
  constructor(
    private playersRepository: PlayersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    entry,
    password,
  }: AuthenticatePlayerUseCaseRequest): Promise<AuthenticatePlayerUseCaseResponse> {
    let player = await this.playersRepository.findByUsername(entry);

    if (!player) {
      const playerByEmail = await this.playersRepository.findByEmail(entry);

      if (!playerByEmail) {
        return left(new WrongCredentialsError());
      }

      player = playerByEmail;
    }

    const isPassowordValid = await this.hashComparer.compare(
      password,
      player.password
    );

    if (!isPassowordValid) {
      throw new WrongCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({
      sub: player.id.toString(),
    });

    return right({ accessToken });
  }
}

import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';

import { Player } from '../../enterprise/entities/player';
import { Username } from '../../enterprise/entities/value-objects/username';
import { HashGenerator } from '../cryptography/hash-generator';
import { PlayersRepository } from '../repositories/players-repository';
import { PlayerAlreadyExistsError } from './errors/player-already-exits-error';

interface RegisterPlayerUseCaseRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

type RegisterPlayerUseCaseResponse = Either<
  PlayerAlreadyExistsError,
  {
    player: Player;
  }
>;

@Injectable()
export class RegisterPlayerUseCase {
  constructor(
    private playersRepository: PlayersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    username,
    email,
    password,
  }: RegisterPlayerUseCaseRequest): Promise<RegisterPlayerUseCaseResponse> {
    const playerWithSameEmail = await this.playersRepository.findByEmail(email);

    if (playerWithSameEmail) {
      return left(new PlayerAlreadyExistsError(email));
    }

    const playerWithSameUsername =
      await this.playersRepository.findByUsername(username);

    if (playerWithSameUsername) {
      return left(new PlayerAlreadyExistsError(username));
    }

    const hashPassword = await this.hashGenerator.hash(password);

    const player = Player.create({
      name,
      username: Username.createFromText(username),
      email,
      password: hashPassword,
      avatar: '',
      isVerified: false,
      currentLevel: 1,
      experienceAmount: 0,
      masteryAmount: 0,
    });

    await this.playersRepository.create(player);

    return right({ player });
  }
}

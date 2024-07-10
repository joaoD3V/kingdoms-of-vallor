import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

import { Player } from '../../enterprise/entities/player';
import { PlayersRepository } from '../repositories/players-repository';

interface GetPlayerByUsernameUseCaseRequest {
  username: string;
}

type GetPlayerByUsernameUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    player: Player;
  }
>;

@Injectable()
export class GetPlayerByUsernameUseCase {
  constructor(private playersRepository: PlayersRepository) {}

  async execute({
    username,
  }: GetPlayerByUsernameUseCaseRequest): Promise<GetPlayerByUsernameUseCaseResponse> {
    const player = await this.playersRepository.findByUsername(username);

    if (!player) {
      return left(new ResourceNotFoundError());
    }

    return right({ player });
  }
}

import { UseCaseError } from '@/core/errors/use-case-error';

export class PlayerAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Player "${identifier}" already exists.`);
  }
}

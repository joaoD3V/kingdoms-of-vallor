import { Module } from '@nestjs/common';

import { AuthenticatePlayerUseCase } from '@/domain/game/application/use-cases/authenticate-player';
import { RegisterPlayerUseCase } from '@/domain/game/application/use-cases/register-player';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateController, CreateAccountController],
  providers: [AuthenticatePlayerUseCase, RegisterPlayerUseCase],
})
export class HttpModule {}

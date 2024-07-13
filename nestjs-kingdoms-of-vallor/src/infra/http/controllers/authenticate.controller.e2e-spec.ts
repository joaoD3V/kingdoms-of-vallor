import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { PlayerFactory } from 'test/factories/make-player';

import { Username } from '@/domain/game/enterprise/entities/value-objects/username';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Authenticate (E2E)', () => {
  let app: INestApplication;
  let playerFactory: PlayerFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PlayerFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    playerFactory = moduleRef.get(PlayerFactory);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await playerFactory.makePrismaPlayer({
      username: Username.createFromText('john_doe'),
      password: await hash('123456', 8),
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      entry: 'john_doe',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});

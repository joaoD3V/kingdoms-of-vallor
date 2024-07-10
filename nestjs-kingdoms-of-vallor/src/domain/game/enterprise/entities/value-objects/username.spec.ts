import { Username } from './username';

it('should be able to create a new username from text', () => {
  const username = Username.createFromText('João Silva');

  expect(username.value).toEqual('joao_silva');
});

import { testServer } from '../jest.setup';

describe('Cidades - Create', () => {
  it('Cria registro', async () => {
    const res1 = await testServer.post('/cidades').send({
      nome: 'Dourados',
    });

    expect(res1.statusCode).toEqual(201);
    expect(typeof res1.body).toEqual('number');
  });

  it('Tenta criar registro com nome muito curto', async () => {
    const res1 = await testServer.post('/cidades').send({
      nome: 'Do',
    });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});

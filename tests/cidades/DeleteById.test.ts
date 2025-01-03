import { testServer } from '../jest.setup';

describe('Cidades - DeleteById', () => {
  it('Apaga registro', async () => {
    const res1 = await testServer.post('/cidades').send({
      nome: 'Dourados',
    });

    expect(res1.statusCode).toEqual(201);

    const resApagada = await testServer.delete(`/cidades/${res1.body}`).send({
      nome: 'Dourados',
    });

    expect(resApagada.statusCode).toEqual(204);
  });

  it('Tenta apagar registro que não existe', async () => {
    const res1 = await testServer.delete('/cidades/99999').send();

    expect(res1.statusCode).toEqual(500);
    expect(res1.body).toHaveProperty('errors.default');
  });
});

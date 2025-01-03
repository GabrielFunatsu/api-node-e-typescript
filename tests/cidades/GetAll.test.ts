import { testServer } from '../jest.setup';

describe('Cidades - GetAll', () => {
  it('Buscar todos os registros', async () => {
    const res1 = await testServer.post('/cidades').send({
      nome: 'Dourados',
    });

    expect(res1.statusCode).toEqual(201);

    const resBuscada = await testServer.get('/cidades').send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(200);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});

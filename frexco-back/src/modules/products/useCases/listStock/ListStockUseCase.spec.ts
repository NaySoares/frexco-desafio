import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { ListStockUseCase } from './ListStockUseCase';

let listStockUseCase: ListStockUseCase;
let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('List stock', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    listStockUseCase = new ListStockUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
  });

  it('Should be able to list the stock', async () => {
    const search = '';

    await createProductUseCase.execute({
      name: 'New product A',
      description: 'Description A',
      price: 10,
    });

    await createProductUseCase.execute({
      name: 'New product B',
      description: 'Description B',
      price: 20,
    });
    const stock = await listStockUseCase.execute({ search });

    expect(stock.length).toEqual(2);
  });

  it('Should be able to list the stock filtered', async () => {
    const search = 'b';

    await createProductUseCase.execute({
      name: 'aaa',
      description: 'Description A',
      price: 10,
    });

    await createProductUseCase.execute({
      name: 'bbb',
      description: 'Description B',
      price: 20,
    });
    const stock = await listStockUseCase.execute({ search });

    expect(stock[0].name).toEqual('bbb');
  });
});

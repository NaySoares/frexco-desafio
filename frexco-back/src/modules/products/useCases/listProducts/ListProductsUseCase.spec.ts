import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { ListProductsUseCase } from './ListProductsUseCase';

let listProductsUseCase: ListProductsUseCase;
let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('List Products', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    listProductsUseCase = new ListProductsUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
  });
  it('Should be able to list all products', async () => {
    const search = '';

    await createProductUseCase.execute({
      name: 'New product A',
      description: 'Description A',
      price: 999,
    });

    await createProductUseCase.execute({
      name: 'New product B',
      description: 'Description B',
      price: 999,
    });
    const listProducts = await listProductsUseCase.execute({ search });

    expect(listProducts.length).toEqual(2);
  });

  it('Should be able to list products filtered', async () => {
    const search = 'A';

    await createProductUseCase.execute({
      name: 'Product A',
      description: 'Description A',
      price: 999,
    });

    await createProductUseCase.execute({
      name: 'Product B',
      description: 'Description B',
      price: 999,
    });
    const listProducts = await listProductsUseCase.execute({ search });

    expect(listProducts[0].name).toEqual('Product A');
  });
});

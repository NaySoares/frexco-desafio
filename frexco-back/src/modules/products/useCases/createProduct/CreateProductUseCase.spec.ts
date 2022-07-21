import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from './CreateProductUseCase';

let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('Create product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
  });

  it('Should be able to create a new product', async () => {
    const product = await createProductUseCase.execute({
      name: 'Fake product',
      description: 'A new description',
      price: 999,
    });

    expect(product).toHaveProperty('id');
  });

  it('Should not be able to create a new product with the same name existent', async () => {
    expect(async () => {
      await createProductUseCase.execute({
        name: 'FakeProduct2',
        description: 'A new description',
        price: 999,
      });

      await createProductUseCase.execute({
        name: 'FakeProduct2',
        description: 'A new description',
        price: 999,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new product with available true by default', async () => {
    const product = await createProductUseCase.execute({
      name: 'Fake Product Disable',
      description: 'A new description',
      price: 999,
    });

    expect(product.available).toBe(false);
  });
});

import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { ListProductByIdUseCase } from './ListProductByIdUseCase';

let listProductByIdUseCase: ListProductByIdUseCase;
let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('List Products', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    listProductByIdUseCase = new ListProductByIdUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
  });
  it('Should be able to get a product by id', async () => {
    const createdProduct = await createProductUseCase.execute({
      name: 'New product A',
      description: 'Description A',
      price: 999,
    });

    await createProductUseCase.execute({
      name: 'New product B',
      description: 'Description B',
      price: 999,
    });

    const { id } = createdProduct;

    const listProduct = await listProductByIdUseCase.execute({ id });

    expect(listProduct.name).toEqual('New product A');
  });
});

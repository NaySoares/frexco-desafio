import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { ListProductsUseCase } from '../listProducts/ListProductsUseCase';
import { DeleteProductUseCase } from './DeleteProductUseCase';

let deleteProductUseCase: DeleteProductUseCase;
let createProductUseCase: CreateProductUseCase;
let listProductsUseCase: ListProductsUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('Delete product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    deleteProductUseCase = new DeleteProductUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    listProductsUseCase = new ListProductsUseCase(productsRepositoryInMemory);
  });

  it('Should be able to delete a product', async () => {
    const createdProduct = await createProductUseCase.execute({
      name: 'ProductTest',
      description: 'Description random',
      price: 55,
    });

    await createProductUseCase.execute({
      name: 'ProductTest2',
      description: 'Description random again',
      price: 45,
    });

    await deleteProductUseCase.execute({
      id: `${createdProduct.id}`,
    });

    const products = await listProductsUseCase.execute({ search: '' });

    expect(products.length).toEqual(1);
  });

  it('should not be to delete a product nonexistent', async () => {
    expect(async () => {
      await createProductUseCase.execute({
        name: 'ProductTest',
        description: 'Description random',
        price: 55,
      });

      await deleteProductUseCase.execute({
        id: 'idNonexistent',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

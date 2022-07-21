import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { EditStockUseCase } from './EditStockUseCase';

let createProductUseCase: CreateProductUseCase;
let editStockUseCase: EditStockUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('Edit stock', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    editStockUseCase = new EditStockUseCase(productsRepositoryInMemory);
  });

  it('Should be able to edit stock of the product', async () => {
    const product: ICreateProductDTO = await createProductUseCase.execute({
      name: 'ProductTest',
      description: 'Description random',
      price: 55,
    });

    const updatedProduct: ICreateProductDTO = await editStockUseCase.execute({
      id: `${product.id}`,
      quantity: 5,
    });

    expect(updatedProduct.quantity).toEqual(5);
  });

  it('Should not be able to zero stock of the product', async () => {
    expect(async () => {
      const product: ICreateProductDTO = await createProductUseCase.execute({
        name: 'ProductTest',
        description: 'Description random',
        price: 55,
      });

      await editStockUseCase.execute({
        id: `${product.id}`,
        quantity: 0,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

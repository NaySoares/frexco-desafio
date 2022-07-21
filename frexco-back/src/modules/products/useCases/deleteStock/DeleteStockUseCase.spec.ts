import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { EditStockUseCase } from '../editStock/EditStockUseCase';
import { DeleteStockUseCase } from './DeleteStockUseCase';

let deleteStockUseCase: DeleteStockUseCase;
let createProductUseCase: CreateProductUseCase;
let editStockUseCase: EditStockUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('Delete stock', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    deleteStockUseCase = new DeleteStockUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    editStockUseCase = new EditStockUseCase(productsRepositoryInMemory);
  });

  it('Should be able to zero the stock of the product', async () => {
    const product: ICreateProductDTO = await createProductUseCase.execute({
      name: 'ProductTest',
      description: 'Description random',
      price: 55,
      cover: 'coverTest',
    });

    await editStockUseCase.execute({
      id: `${product.id}`,
      quantity: 5,
    });

    const updatedProduct: ICreateProductDTO = await deleteStockUseCase.execute({
      id: `${product.id}`,
    });

    expect(updatedProduct.quantity).toEqual(0);
  });

  it('Should not be able to zero the stock of the product nonexistent', async () => {
    expect(async () => {
      await createProductUseCase.execute({
        name: 'ProductTest2',
        description: 'Description random',
        price: 55,
        cover: 'coverTest',
      });

      await deleteStockUseCase.execute({
        id: 'an-obviously-non-existent-id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

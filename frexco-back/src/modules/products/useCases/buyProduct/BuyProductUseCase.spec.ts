import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { EditStockUseCase } from '../editStock/EditStockUseCase';
import { BuyProductUseCase } from './BuyProductUseCase';

let buyProductUseCase: BuyProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;
let editStockUseCase: EditStockUseCase;

describe('Buy product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    buyProductUseCase = new BuyProductUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
    editStockUseCase = new EditStockUseCase(productsRepositoryInMemory);
  });

  it('Should be able to buy a product', async () => {
    const product: ICreateProductDTO = await createProductUseCase.execute({
      name: 'Fake product',
      description: 'A fake product with sadness',
      price: 40,
    });

    await editStockUseCase.execute({
      id: `${product.id}`,
      quantity: 5,
    });

    const updatedProduct = await buyProductUseCase.execute({
      id: `${product.id}`,
      quantity: 1,
    });

    expect(updatedProduct.quantity).toEqual(4);
  });

  it('Should not be able to buy a product out stock', async () => {
    expect(async () => {
      const product: ICreateProductDTO = await createProductUseCase.execute({
        name: 'Fake product 2',
        description: 'A fake product out stock',
        price: 45,
      });

      await buyProductUseCase.execute({
        id: `${product.id}`,
        quantity: 1,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

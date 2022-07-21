import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { ProductsRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductUseCase } from '../createProduct/CreateProductUseCase';
import { EditProductUseCase } from './EditProductUseCase';

let editProductUseCase: EditProductUseCase;
let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe('Edit product', () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    editProductUseCase = new EditProductUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory);
  });

  it('Should be able to edit a product', async () => {
    const product: ICreateProductDTO = await createProductUseCase.execute({
      name: 'New product',
      description: 'Description',
      price: 999,
    });

    const updatedProduct: ICreateProductDTO = await editProductUseCase.execute({
      id: `${product.id}`,
      name: 'Product vip',
      description: 'New description',
      price: 111,
      cover: 'coverTest',
    });

    expect(updatedProduct.price).toEqual(111);
  });

  it('Should be able to edit only one product feature and keep the old ones', async () => {
    const product: ICreateProductDTO = await createProductUseCase.execute({
      name: 'New product',
      description: 'Description',
      price: 999,
    });

    const updatedProduct = await editProductUseCase.execute({
      id: `${product.id}`,
      name: '',
      description: '',
      price: 90,
      cover: 'coverTest',
    });

    expect(updatedProduct.name).toEqual('New product');
  });

  it('Should not be able to set a price negative in product', async () => {
    expect(async () => {
      const product: ICreateProductDTO = await createProductUseCase.execute({
        name: 'New product',
        description: 'Description',
        price: 999,
      });

      await editProductUseCase.execute({
        id: `${product.id}`,
        name: '',
        description: '',
        price: -90,
        cover: 'coverTest',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

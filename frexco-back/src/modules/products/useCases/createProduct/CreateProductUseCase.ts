import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  price: number;
  cover?: string;
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  async execute({
    name,
    description,
    price,
    cover,
  }: IRequest): Promise<Product> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('Product already register!');
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price,
      cover,
    });

    return product;
  }
}

export { CreateProductUseCase };

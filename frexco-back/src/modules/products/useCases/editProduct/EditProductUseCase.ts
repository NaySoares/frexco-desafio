import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  price: number;
  id: string;
  cover: string;
}

@injectable()
class EditProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  async execute({
    id,
    name,
    description,
    price,
    cover,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    if (price < 0) {
      throw new AppError('Price must be greater than zero!');
    }

    const data = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      cover: cover || product.cover,
    };

    const editedProduct = await this.productsRepository.updateById(
      id,
      data,
    );

    return editedProduct;
  }
}

export { EditProductUseCase };

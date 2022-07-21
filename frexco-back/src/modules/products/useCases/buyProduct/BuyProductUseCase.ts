import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  quantity: number;
}

@injectable()
class BuyProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  async execute({
    id,
    quantity,
  }: IRequest): Promise<Product> {
    let available = true;
    const product = await this.productsRepository.findById(id);

    if (quantity <= 0) {
      throw new AppError('Quantity invalid');
    }

    if (!product) {
      throw new AppError('Product not found!');
    }

    if (!product.available) {
      throw new AppError('Product out stock!');
    }

    const resultStock = product.quantity - quantity;

    if (resultStock < 0) {
      throw new AppError('Not enough stock!');
    } else if (resultStock === 0) {
      available = false;
    }

    const updatedProduct = await this.productsRepository.updateStockById(
      id,
      resultStock,
      available,
    );

    return updatedProduct;
  }
}

export { BuyProductUseCase };

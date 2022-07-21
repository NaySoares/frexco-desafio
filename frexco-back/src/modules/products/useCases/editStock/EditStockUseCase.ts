import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  quantity: number;
}

@injectable()
class EditStockUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  async execute({
    id,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    const available = true;

    if (!product) {
      throw new AppError('Product not found!');
    }

    if (quantity <= 0) {
      throw new AppError('Stock cannot be zero or negative. Please delete it if you want to zero it!');
    }

    const updatedProduct = await this.productsRepository.updateStockById(
      id,
      quantity,
      available,
    );

    return updatedProduct;
  }
}

export { EditStockUseCase };

import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';

interface IRequest {
  id: string,
}

@injectable()
class ListProductByIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    id,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    return product;
  }
}

export { ListProductByIdUseCase };

import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';

interface IRequest {
  search: string,
}

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    search,
  }: IRequest): Promise<Product[]> {
    const products = await this.productsRepository.list(search);

    return products;
  }
}

export { ListProductsUseCase };

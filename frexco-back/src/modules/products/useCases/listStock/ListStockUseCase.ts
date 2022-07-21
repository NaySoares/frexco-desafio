import { IStock } from 'interfaces/Stock';
import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductRepository';

interface IRequest {
  search: string,
}

@injectable()
class ListStockUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    search,
  }: IRequest): Promise<IStock[]> {
    const stock = await this.productsRepository.listStock(search);

    return stock;
  }
}

export { ListStockUseCase };

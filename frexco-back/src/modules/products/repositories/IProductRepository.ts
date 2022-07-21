import { IStock } from 'interfaces/Stock';

import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { Product } from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product>;
  findById(id: string): Promise<Product>;
  deleteById(id: string): Promise<void>;
  updateById(id: string, data: ICreateProductDTO): Promise<Product>;
  updateStockById(id: string, quantity: number, available: boolean): Promise<Product>;
  deleteStockById(id: string): Promise<Product>;
  list(search?: string): Promise<Product[]>;
  listStock(search?: string): Promise<IStock[]>;
}

export { IProductsRepository };

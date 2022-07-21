import { IStock } from 'interfaces/Stock';
import { getRepository, Repository } from 'typeorm';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductRepository';

import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    name,
    description,
    quantity,
    price,
    cover,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create(
      {
        name,
        description,
        quantity,
        price,
        cover,
      },
    );

    await this.repository.save(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.repository.findOne({ name });

    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne(id);

    return product;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async updateById(
    id: string,
    data: ICreateProductDTO,
  ): Promise<Product> {
    const {
      name, description, price, cover,
    } = data;

    await this.repository.update(id, {
      name, description, price, cover,
    });

    const editedProduct = await this.findById(id);

    return editedProduct;
  }

  async updateStockById(
    id: string,
    quantity: number,
    available: boolean,
  ): Promise<Product> {
    await this.repository.update(id, { quantity, available });

    const updatedProduct = await this.findById(id);

    return updatedProduct;
  }

  async deleteStockById(
    id: string,
  ): Promise<Product> {
    await this.repository.update(id, { quantity: 0, available: false });

    const updatedProduct = await this.findById(id);

    return updatedProduct;
  }

  async list(search?: string): Promise<Product[]> {
    const products = await this.repository.find();

    if (search) {
      const searchLower = search.toLowerCase();
      const filteredProducts = products.filter(
        (product) => product.name.toLowerCase().includes(searchLower),
      );
      return filteredProducts;
    }

    return products;
  }

  async listStock(search?: string): Promise<IStock[]> {
    const products = await this.repository.find();

    const listStock = products.map((product) => {
      const { id } = product;
      const { name } = product;
      const { quantity } = product;
      const newProduct = { id, name, quantity };
      return newProduct;
    });

    if (search) {
      const searchLower = search.toLowerCase();
      const filteredProducts = listStock.filter(
        (product) => product.name.toLowerCase().includes(searchLower),
      );
      return filteredProducts;
    }

    return listStock;
  }
}

export { ProductsRepository };

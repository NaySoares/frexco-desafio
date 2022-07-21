import { IStock } from 'interfaces/Stock';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { Product } from '@modules/products/infra/typeorm/entities/Product';

import { IProductsRepository } from '../IProductRepository';

class ProductsRepositoryInMemory implements IProductsRepository {
  products: Product[] = []
  async create({
    name,
    description,
    quantity,
    price,
    cover,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      name,
      description,
      quantity,
      price,
      cover,
    });

    this.products.push(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    return this.products.find((product) => product.name === name);
  }

  async findById(id: string): Promise<Product> {
    return this.products.find((product) => product.id === id);
  }

  async deleteById(id: string): Promise<void> {
    const element = await this.findById(id);
    const index = this.products.indexOf(element);

    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  async updateById(id: string, data: ICreateProductDTO): Promise<Product> {
    const {
      name, description, price, cover,
    } = data;
    const product = await this.findById(id);

    this.deleteById(product.id);

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.cover = cover || product.cover;
    product.quantity = product.quantity || 0;

    this.products.push(product);

    return product;
  }

  async updateStockById(id: string, quantity: number, available: boolean): Promise<Product> {
    const product = await this.findById(id);
    this.deleteById(product.id);

    product.quantity = quantity;
    product.available = available;

    this.products.push(product);

    return product;
  }

  async deleteStockById(id: string): Promise<Product> {
    const product = await this.findById(id);
    this.deleteById(product.id);

    product.quantity = 0;

    this.products.push(product);

    return product;
  }

  async list(search?: string): Promise<Product[]> {
    const listProducts = this.products;

    if (search) {
      const searchLower = search.toLowerCase();
      const filteredProducts = listProducts.filter(
        (product) => product.name.toLowerCase().includes(searchLower),
      );
      return filteredProducts;
    }

    return listProducts;
  }

  async listStock(search?: string): Promise<IStock[]> {
    const listProducts = this.products;

    const listStock = listProducts.map((product) => {
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

export { ProductsRepositoryInMemory };

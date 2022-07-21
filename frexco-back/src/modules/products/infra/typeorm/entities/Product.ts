import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('products')
class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cover: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  available: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = false;
      this.quantity = 0;
    }
    if (!this.cover) {
      this.cover = '';
    }
  }
}

export { Product };

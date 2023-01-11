import { Repository } from '@src/repositories/Repository';
import { Product } from '@src/entities/Product';

export interface ProductRepository extends Repository<Product> {
  findByCategory(category: string): Product[];
}

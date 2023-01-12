import { Repository } from '@src/repositories';
import { Product } from '@src/entities';

export interface ProductRepository extends Repository<Product> {
  findByCategory(category: string): Product[];
}

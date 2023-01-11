import { Repository } from './Repository';
import { Product } from '../entities/Product';

export interface ProductRepository extends Repository<Product> {
  findByCategory(category: string): Product[];
}

import { Product } from '@src/entities/Product';
import { ProductRepository } from '@src/repositories/ProductRepository';

export interface GetProductsByCategoryRequest {
  category: string;
}

export type GetProductsByCategoryResponse = Product[];

export class GetProductsByCategory {
  public constructor(private productRepository: ProductRepository) {}

  public async execute({
    category,
  }: GetProductsByCategoryRequest): Promise<GetProductsByCategoryResponse> {
    return this.productRepository.findByCategory(category);
  }
}

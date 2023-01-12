import { Product } from '@src/domain/entities';
import { ProductRepository } from '@src/domain/repositories';

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

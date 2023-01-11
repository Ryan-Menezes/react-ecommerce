import { Product } from '../entities/Product';
import { ProductError } from '../errors/ProductError';
import { ProductRepository } from '../repositories/ProductRepository';

export interface GetProductByIdRequest {
  id: string;
}

export type GetProductByIdResponse = Product;

export class GetProductById {
  public constructor(private productRepository: ProductRepository) {}

  public async execute({
    id,
  }: GetProductByIdRequest): Promise<GetProductByIdResponse> {
    const product = this.productRepository.findById(id);

    if (product === null) {
      throw new ProductError('There is no product with this id');
    }

    return product;
  }
}

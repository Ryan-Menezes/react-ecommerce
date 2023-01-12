import { ProductNotFoundError } from '@src/errors/ProductNotFoundError';
import { EntityId } from '@src/entities/Entity';
import { Product } from '@src/entities/Product';
import { ProductRepository } from '@src/repositories/ProductRepository';

export interface GetProductByIdRequest {
  id: EntityId;
}

export type GetProductByIdResponse = Product;

export class GetProductById {
  public constructor(private productRepository: ProductRepository) {}

  public async execute({
    id,
  }: GetProductByIdRequest): Promise<GetProductByIdResponse> {
    const product = await this.productRepository.findById(id);

    if (product === null) {
      throw new ProductNotFoundError(
        'There is no product registered with this id'
      );
    }

    return product;
  }
}

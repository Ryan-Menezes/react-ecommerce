import { ProductNotFoundError } from '../../../errors';
import { EntityId } from '../../../domain/entities';
import { Product } from '../../../domain/entities';
import { ProductRepository } from '../../../domain/repositories';

export interface GetProductByIdRequest {
  id: EntityId;
}

export type GetProductByIdResponse = Product;

export class GetProductById {
  public constructor(private readonly productRepository: ProductRepository) {}

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

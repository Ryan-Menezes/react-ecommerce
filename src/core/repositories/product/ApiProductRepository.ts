import axios from 'axios';
import { Product, EntityId } from '@src/domain/entities';
import { ProductRepository } from '@src/domain/repositories';

export interface ApiResponseProducts {
  products: Product[];
  statusCode: number;
}

export interface ApiResponseProduct {
  product: Product;
  statusCode: number;
}

export class ApiProductRepository implements ProductRepository {
  private request;

  public constructor() {
    this.request = axios.create({
      baseURL: process.env.ECOMMERCE_API_URL,
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getAll(): Promise<Product[]> {
    try {
      const { data } = await this.request.get<ApiResponseProducts>('/products');

      return data.products;
    } catch {
      return [];
    }
  }

  public async findById(id: EntityId): Promise<Product | null> {
    try {
      const { data } = await this.request.get<ApiResponseProduct>(
        `/products/${id}`
      );

      return data.product;
    } catch {
      return null;
    }
  }
}

import { UniqueKeyGenerator } from '.';
import { v4 as uuidv4 } from 'uuid';

export class UuidUniqueKeyGenerator implements UniqueKeyGenerator {
  public async generate(): Promise<string> {
    return uuidv4();
  }
}

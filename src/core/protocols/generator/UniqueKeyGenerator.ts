export interface UniqueKeyGenerator {
  generate(): Promise<string>;
}

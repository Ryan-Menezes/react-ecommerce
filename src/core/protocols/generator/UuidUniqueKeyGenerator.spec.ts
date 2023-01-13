import { UuidUniqueKeyGenerator } from '@src/core/protocols/generator';

const makeSut = () => {
  const sut = new UuidUniqueKeyGenerator();

  return {
    sut,
  };
};

describe('UuidUniqueKeyGenerator', () => {
  it('should generate a uuid', async () => {
    const { sut } = makeSut();

    const uuid = await sut.generate();

    expect(uuid).toEqual(expect.any(String));
    expect(uuid.length).toBe(36);
  });
});

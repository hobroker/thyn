import * as loadModels from '../loadModels';

describe('loadModels', () => {
  it('should call mongo with the name schema of the models', () => {
    const models = {
      One: 'one-schema',
      Two: 'two-schema',
    };
    const mongo = {
      model: jest.fn((name, schema) => schema),
    };

    const result = loadModels.default(mongo, models);

    expect(mongo.model).toBeCalledTimes(2);
    expect(result).toEqual({
      One: 'one-schema',
      Two: 'two-schema',
    });
  });
});

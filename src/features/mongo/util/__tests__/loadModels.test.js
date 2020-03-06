import loadModels from '../loadModels';

describe('loadModels', () => {
  it('should call mongo with the name schema of the models', () => {
    const models = {
      One: '',
      Two: '',
    };
    const mongo = {
      model: jest.fn((name, schema) => schema),
    };

    const result = loadModels(mongo, models);

    expect(mongo.model).toBeCalledTimes(2);
    expect(Object.keys(result)).toEqual(Object.keys(models));
  });
});

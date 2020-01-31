import * as _ from 'lodash/fp';
import { Model } from 'mongoose';

class AbstractModel extends Model {
  /**
   * @param {object} data
   * @param {string} attr
   * @return {Promise<AbstractModel>}
   * @private
   */
  static async findOrCreateOne(data, attr) {
    const filter = {};
    if (attr) {
      filter[attr] = data[attr];
    }

    if (!_.isEmpty(filter)) {
      const model = await this.findOne(filter);
      if (model) {
        return model;
      }
    }

    return this.create(data);
  }

  /**
   * @param {object} items
   * @param {string} property
   * @return {Promise<AbstractModel>}
   * @private
   */
  static async manyPickFindOrCreate(items, property) {
    const values = _.map(property, items);
    const models = await this.find({
      [property]: {
        $in: values,
      },
    });
    const missingItems = _.difference(values, _.map(property, models));
    const itemsToCreate = items.filter(item =>
      missingItems.includes(item[property]),
    );

    if (itemsToCreate.length) {
      const newModels = await this.create(itemsToCreate);
      models.push(...newModels);
    }

    return models;
  }
}

export default AbstractModel;

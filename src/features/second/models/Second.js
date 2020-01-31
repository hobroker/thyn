import { AbstractModel } from '../../mongo';

class Second extends AbstractModel {
  schema = {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
  };
}

export default Second;

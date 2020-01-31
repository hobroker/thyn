import { AbstractModel } from '../../mongo';

class Demo extends AbstractModel {
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

export default Demo;

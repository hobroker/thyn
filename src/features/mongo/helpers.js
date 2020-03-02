export const findLatest = Model =>
  Model.findOne().sort({
    createdAt: 'desc',
  });

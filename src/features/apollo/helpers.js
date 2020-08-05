export const withResolver = resolver => (_, args, { oxi }) =>
  oxi(resolver(args));

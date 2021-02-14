export const withResolver = resolver => (_, args, { oxi, user }) =>
  oxi(resolver({ user, args }));

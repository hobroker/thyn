export const noContent = res => {
  res.status(204);

  return null;
};

export const dataOrNoContent = res => data => {
  if (!data) {
    return noContent(res);
  }

  return data;
};

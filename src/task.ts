type Data<D> = {
  data: D[];
};

export const categoryTree = async <T extends Data<C>, C, E>(
  dataFn: () => Promise<T>,
  mapFn: (categories: C[]) => E[],
  postProcess?: (elements: E[]) => E[]
): Promise<E[]> => {
  const res = await dataFn();

  if (!res.data) {
    return [];
  }

  const result = mapFn(res.data);

  return postProcess ? postProcess(result) : result;
};

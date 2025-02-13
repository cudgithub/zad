import test from 'ava';

import { mapCategories, setCategoriesVisibility } from './categoriesUtils';
import { CORRECT } from './correctResult';
import { INCORRECT } from './currentResult';
import { getCategories } from './mockedApi';
import { categoryTree } from './task';

test('categoryTree should return correct result', async (t) => {
  const result = await categoryTree(
    getCategories,
    mapCategories,
    setCategoriesVisibility
  );
  const correctResult = CORRECT;
  t.deepEqual(result, correctResult);
});

test('categoryTree should not return incorrect result', async (t) => {
  const result = await categoryTree(
    getCategories,
    mapCategories,
    setCategoriesVisibility
  );
  const incorrectResult = INCORRECT;
  t.notDeepEqual(result, incorrectResult);
});

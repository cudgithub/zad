import { Category } from './mockedApi';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

export const mapCategories = (categories: Category[]): CategoryListElement[] =>
  categories
    .map((category) => {
      const {
        Title: title,
        MetaTagDescription: image,
        name,
        id,
        children,
      } = category;
      let orderAsString = title;

      if (title?.includes('#')) {
        orderAsString = title.split('#')[0];
      }

      let order = parseInt(orderAsString);
      if (isNaN(order)) {
        order = id;
      }

      return {
        id,
        image,
        name,
        order,
        children: children ? mapCategories(children) : [],
        showOnHome: false,
      };
    })
    .sort((a, b) => a.order - b.order);

export const setCategoriesVisibility = (
  elements: CategoryListElement[]
): CategoryListElement[] => {
  const toShowOnHome: number[] = [];

  if (elements.length <= 5) {
    elements.forEach((a) => (a.showOnHome = true));
  } else if (toShowOnHome.length > 0) {
    elements.forEach((x) => (x.showOnHome = toShowOnHome.includes(x.id)));
  } else {
    elements.forEach((x, index) => (x.showOnHome = index < 3));
  }
  return elements;
};

import type { IArea, ICategory, IThing, IAreaWithItems, IGroupedCategory } from "types/jd";

import { DND_FLIP_DURATION_MS } from "../data/constants";

export const dndFlipOption = { flipDurationMs: DND_FLIP_DURATION_MS };

export const svelteAnimateOptions = { duration: DND_FLIP_DURATION_MS };

// options: https://github.com/isaacHagoel/svelte-dnd-action#input
export const dndOptions = {
  flipDurationMs: DND_FLIP_DURATION_MS,
  type: "columns",
};

/**
 * On finalize dnd, update area "order" property with the new data.
 */
export const reorderItems = (newItems: IArea[] | ICategory[] | IThing[]): IArea[] | ICategory[] | IThing[] => {
  return newItems.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};

/**
 * Find and add categories to each area.
 */
export const addCategoriesToAreas = (areas: IArea[], categories: ICategory[]): IAreaWithItems[] => {
  if (!areas) return [];
  if (!categories) return areas.map((area) => ({ ...area, items: [] })); // add empty items property to prevent dnd error

  // make temp areas object
  let tempAreas: any = {};
  areas.forEach((area) => {
    tempAreas[area.id] = { ...area, items: [] };
  });
  categories.forEach((cat) => {
    if (tempAreas[cat.areaId]) tempAreas[cat.areaId].items.push(cat);
  });

  return areas.map((area) => ({ ...area, items: tempAreas[area.id]["items"] }));
};

export const addGroupedCategoriesToAreas = (areas: IArea[], groupedCats: IGroupedCategory): IAreaWithItems[] => {
  if (!areas) return [];
  if (!groupedCats || !Object.values(groupedCats)?.length) return areas.map((area) => ({ ...area, items: [] })); // add empty items property to prevent dnd error

  areas.forEach((area, index) => {
    if (groupedCats[area.id]) {
      areas[index]["items"] = groupedCats[area.id];
    } else {
      areas[index]["items"] = [];
    }
  });
  return areas;
};

export const groupCategoriesByAreaId = (categories: ICategory[]): IGroupedCategory => {
  let tempGroupedCategories: IGroupedCategory = {};
  categories?.forEach((cat) => {
    if (tempGroupedCategories[cat.areaId]) {
      tempGroupedCategories[cat.areaId].push(cat);
    } else {
      tempGroupedCategories[cat.areaId] = [cat];
    }
  });
  return tempGroupedCategories;
};

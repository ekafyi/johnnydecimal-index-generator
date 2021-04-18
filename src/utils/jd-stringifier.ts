import type { IAreaWithItems, ICategory, IThing } from "types/jd";

import { createAreaJdId, createCategoryJdId, createThingJdIdFromCategory } from "./jd-id-builder";

import { get } from "svelte/store";
import { groupedThings } from "../stores";

const stringifyThing = (thing: IThing, catJdId: string) => {
  return `      ${createThingJdIdFromCategory(thing.order, catJdId)} ${thing.name}\n`;
};

const stringifyCategory = (category: ICategory, area: IAreaWithItems) => {
  const catJdId = createCategoryJdId(category.order, area.order);

  const allThings = get(groupedThings);
  const thingsInCategory = allThings && allThings[category.id]?.length ? allThings[category.id] : null;

  if (thingsInCategory) {
    const stringThings = thingsInCategory.map((thing) => stringifyThing(thing, catJdId)).join("");
    return `   ${catJdId} ${category.name}\n${stringThings}`;
  }
  return `   ${catJdId} ${category.name}\n`;
};

const stringifyArea = (area: IAreaWithItems) => {
  const areaJdId = createAreaJdId(area.order);
  if (area.items?.length) {
    const stringCats = area.items.map((cat) => stringifyCategory(cat, area)).join("");
    return `${areaJdId} ${area.name}\n${stringCats}`;
  }
  return `${areaJdId} ${area.name}\n`;
};

export const stringifyAreas = (areas: IAreaWithItems[]) => {
  if (!areas) return "";
  const stringAreas = areas.map((area) => stringifyArea(area)).join("");
  return stringAreas;
};

import { MAX_CATEGORY_COUNT, MAX_THING_COUNT } from "../data/constants";

export const getCategoryCountText = (items: any[]) => {
  if (!items || !items.length) return `0 / ${MAX_CATEGORY_COUNT} categories`;
  return `${items.length} / ${MAX_CATEGORY_COUNT} categories`;
};

export const getThingCountText = (items: any[]) => {
  if (!items || !items.length) return `0 / ${MAX_THING_COUNT} things`;
  return `${items.length} / ${MAX_THING_COUNT} things`;
};

export const getThingCountTextFromLength = (length: number) => {
  if (!length) return `0 / ${MAX_THING_COUNT} things`;
  return `${length} / ${MAX_THING_COUNT} things`;
};

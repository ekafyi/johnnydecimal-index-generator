import { MIN_COUNT, MAX_AREA_COUNT, MAX_CATEGORY_COUNT, MAX_THING_COUNT } from "../data/constants";

const isValid = (order: number, type: "AREA" | "CATEGORY" | "THING") => {
  switch (type) {
    case "AREA":
      return order >= MIN_COUNT && order <= MAX_AREA_COUNT;
    case "CATEGORY":
      return order >= MIN_COUNT && order <= MAX_CATEGORY_COUNT;
    case "THING":
      return order >= MIN_COUNT && order <= MAX_THING_COUNT;
    default:
      return false;
  }
};

/**
 * Generate Johnny.Decimal Area id
 * @param order number — Area order; must be between 1-9
 * @returns string — readable Area J.D id, eg. "10-19"
 */
export const createAreaJdId = (order: number) => {
  if (!isValid(order, "AREA")) return null;
  return `${order}0-${order}9`;
};

/**
 * Generate Johnny.Decimal Category id
 * @param order number — Category order; must be between 1-9
 * @param areaOrder number — Area order; must be between 1-9
 * @returns string? — readable Category J.D id, eg. "11"
 */
export const createCategoryJdId = (order: number, areaOrder: number) => {
  if (!isValid(order, "CATEGORY") || !isValid(areaOrder, "AREA")) return null;
  return `${areaOrder}${order}`;
};

/**
 * Generate Johnny.Decimal Thing id from Category J.D id
 * @param order number — Thing order; must be between 1-99
 * @param categoryJdId string — readable Category J.D id, eg. "11"
 * @returns string? — readable Thing J.D id, eg. "11.01"
 */
export const createThingJdIdFromCategory = (order: number, categoryJdId: string) => {
  if (!isValid(order, "THING")) return null;
  return `${categoryJdId}.${order < 10 ? `0${order}` : order}`;
};

/**
 * Generate Johnny.Decimal Thing id from category and area orders
 * @param order number — Thing order; must be between 1-99
 * @param categoryOrder number — Category order; must be between 1-9
 * @param areaOrder number — Area order; must be between 1-9
 * @returns string? — readable Thing J.D id, eg. "11.01"
 */
export const createThingJdIdFromOrders = (order: number, categoryOrder: number, areaOrder: number) => {
  if (!isValid(order, "THING") || !isValid(categoryOrder, "CATEGORY") || !isValid(areaOrder, "AREA")) return null;

  const categoryJdId = createCategoryJdId(categoryOrder, areaOrder);
  return `${categoryJdId}.${order < 10 ? `0${order}` : order}`;
};

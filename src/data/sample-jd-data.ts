import type { IArea, ICategory, IThing } from "../../types/jd";

export const sampleAreas: IArea[] = [
  {
    id: "one",
    order: 1, // jdReadableId = "10-19"
    name: "Finance",
  },
  {
    id: "five",
    order: 2, // jdReadableId = "20-29"
    name: "Internal Documentation",
  },
];

export const sampleCategories: ICategory[] = [
  {
    id: "two",
    order: 1, // jdReadableId = "11"
    name: "Invoices",
    areaId: "one",
  },
  {
    id: "three",
    order: 2, // jdReadableId = "12"
    name: "Quotations",
    areaId: "one",
  },
  {
    id: "ten",
    order: 3,
    name: "Taxes",
    areaId: "one",
  },
  {
    id: "nine",
    order: 1, // jdReadableId = "21"
    name: "Meeting Minutes",
    areaId: "five",
  },
  {
    id: "eleven",
    order: 2,
    name: "Something Else",
    areaId: "five",
  },
];

export const sampleThings: IThing[] = [
  {
    id: "zczxcxzc",
    order: 1, // jdReadableId = "11.01"
    name: "Invoices - Eka",
    categoryId: "two",
  },
  {
    id: "askdjakd",
    order: 2, // jdReadableId = "11.02"
    name: "Invoices - Someone Else",
    categoryId: "two",
  },
  {
    id: "jksjdflsdjf",
    order: 1, // jdReadableId = "21.01"
    name: "Quotation - Acme, Inc",
    categoryId: "three",
  },
  {
    id: "kjlkdjfg",
    order: 1, // jdReadableId = "21.01"
    name: "Meeting Minutes April 2021",
    categoryId: "nine",
  },
];

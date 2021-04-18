import type { IGroupedCategory } from "../../types/jd";
import { writable } from "svelte/store";

// Use this ↓ to customize fallback initial data if no localStorage data.
// import { groupCategoriesByAreaId } from "../utils/dnd-helpers";
// import { sampleCategories } from "../data/sample-jd-data";
// const initialData = JSON.parse(localStorage.getItem("groupedCategories")) || groupCategoriesByAreaId(sampleCategories);

// Get the value out of storage on load.
const initialData = JSON.parse(localStorage.getItem("groupedCategories"));

export const groupedCategories = writable<IGroupedCategory>(initialData);

groupedCategories.subscribe((value) => (localStorage.groupedCategories = JSON.stringify(value)));

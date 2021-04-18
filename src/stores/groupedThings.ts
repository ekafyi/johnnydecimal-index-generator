import type { IGroupedThing } from "../../types/jd";
import { writable } from "svelte/store";

// Get the value out of storage on load.
const initialData = JSON.parse(localStorage.getItem("groupedThings"));

export const groupedThings = writable<IGroupedThing>(initialData);

groupedThings.subscribe((value) => (localStorage.groupedThings = JSON.stringify(value)));

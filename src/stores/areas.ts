import { writable } from "svelte/store";
import type { IArea } from "../../types/jd";

// Get the value out of storage on load.
const initialData = JSON.parse(localStorage.getItem("areas"));

export const areas = writable<IArea[]>(initialData);

areas.subscribe((value) => (localStorage.areas = JSON.stringify(value)));

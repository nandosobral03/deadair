import { writable } from "svelte/store";

export const tokenStore = writable<string | undefined>(undefined);
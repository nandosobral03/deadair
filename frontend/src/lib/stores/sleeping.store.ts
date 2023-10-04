import { writable } from "svelte/store";


export let sleepingStore = writable(false);
export let sleepingTimerStore = writable<any>(null);
import { writable } from 'svelte/store'

export type ModalModel = {
    title: string,
    component: any,
    props: any
    size: 'xs' | 'sm' | 'md' | 'lg';
}

export const currentModalStore = writable<ModalModel | null>(null)


const createModalStore = () => {
    const { subscribe, set, update } = writable<ModalModel | undefined>(undefined)
    return {
        subscribe,
        set: (value: ModalModel) => set(value),
        clear: () => set(undefined),
    }
}


export const modalStore = createModalStore()

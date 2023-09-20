import { writable } from "svelte/store";


const createLoadingStore = () => {
    const { subscribe, set, update } = writable({
        loading: false,
        message: ''
    });

    return {
        subscribe,
        setLoading: (loading: boolean) => update((all) => {
            if (loading) {
                return { ...all, loading }
            } else {
                return { ...all, loading, message: '' }
            }
        }
        ),
        setMessage: (message: string) => update((all) => ({ ...all, message })),
    }
}
export let loadingStore = createLoadingStore();

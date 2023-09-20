import { PUBLIC_API_URL } from '$env/static/public';
import { loadingStore } from '$lib/stores/loading.store';
import axios from 'axios';
// http://localhost:3000/api/utils/image
export const uploadImage = async (file: File, userId?: string) => {
    loadingStore.setMessage('Uploading image...');
    const headers = userId ? { 'user-id': userId } : { 'x-api-key': localStorage.getItem('x-api-key') }
    const response = await axios.post(`${PUBLIC_API_URL}/utils/image`, file, {
        headers: {
            ...headers,
            "Content-Type": "image/jpeg"
        }
    });
    return response.data;
}
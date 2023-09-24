import { PUBLIC_API_URL } from '$env/static/public';
import { loadingStore } from '$lib/stores/loading.store';
import axios from 'axios';
// http://localhost:3000/api/utils/image
export const uploadImage = async (file: File, token: string) => {
    loadingStore.setMessage('Uploading image...');
    const headers = { 'Authorization': `Bearer ${token}` }
    const response = await axios.post(`${PUBLIC_API_URL}/utils/image`, file, {
        headers: {
            ...headers,
            "Content-Type": "image/jpeg"
        }
    });
    return response.data;
}
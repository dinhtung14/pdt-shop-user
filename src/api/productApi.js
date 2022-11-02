import { ENDPOINT } from 'constants/global';
import axiosClient from './axiosClient';

const productApi = {
    getAll: ({ page, limit }) => {
        const url = `/product?page=${page}&limit=${limit}`;
        return axiosClient.get(url);
    },

    show: (id) => {
        const url = `${ENDPOINT.product.show}/${id}`;

        return axiosClient.get(url);
    },
}

export default productApi;
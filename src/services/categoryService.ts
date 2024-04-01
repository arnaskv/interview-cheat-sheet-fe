import axios from 'axios';
import { Category } from '../interfaces/Category';

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        //TODO:need to setup cors at proxy or in backend security config. For now use localhost route to check how it works
        const response = await axios.get<Category[]>('https://givgai-api.devbstaging.com/api/v1/category');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
    }
};

export const fetchCategory = async (id: number): Promise<Category> => {
    try {
        //TODO:need to setup cors at proxy or in backend security config. For now use localhost route to check how it works
        const response = await axios.get<Category>(`https://givgai-api.devbstaging.com/api/v1/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw new Error('Error fetching category');
    }
};

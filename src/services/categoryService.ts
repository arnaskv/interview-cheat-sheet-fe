import { Category } from "../interfaces/Category";

const simulateNetworkDelay = (dalay: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(resolve, dalay);
    });
}

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        await simulateNetworkDelay();

        const categories: Category[] = [
            { id: 1, name: 'Category 0' },
            { id: 2, name: 'Category 1' },
            { id: 3, name: 'Category 2' },
            { id: 4, name: 'Category 3' },
            { id: 5, name: 'Category 4' }
        ];

        return categories;
    } catch (error) {
        throw new Error('Error fetching categories');
    }
};
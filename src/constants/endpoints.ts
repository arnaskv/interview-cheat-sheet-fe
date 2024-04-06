const BASE_URL = 'https://gvigai-api.devbstaging.com/api/v1';

export const ENDPOINTS = {
  CATEGORY: {
    GET_ALL: `${BASE_URL}/category`,
    GET_ONE: (id: string) => `${BASE_URL}/category/${id}`,
    CREATE: `${BASE_URL}/category`,
  },
  QUESTION: {
    CREATE: `${BASE_URL}/question`,
    GET_ALL: `${BASE_URL}/interview-questions`,
    GET_ONE: (id: string) => `${BASE_URL}/interview-questions/${id}`,
  },
};

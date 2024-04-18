const BASE_URL = 'https://gvigai-api.devbstaging.com/api/v1';

export const ENDPOINTS = {
  CATEGORY: {
    GET_ALL: `${BASE_URL}/category`,
    GET_ONE: (id: string) => `${BASE_URL}/category/${id}`,
    CREATE: `${BASE_URL}/category`,
    DELETE: (id: string) => `${BASE_URL}/category/${id}`,
  },
  QUESTION: {
    CREATE: `${BASE_URL}/question`,
    GET_ONE: (id: string) => `${BASE_URL}/interview-questions/${id}`,
    GET_ALL: `${BASE_URL}/interview-questions`,
  },
  COMMENT: {
    GET_ALL: `${BASE_URL}/comment`,
    GET_ONE: (id: string) => `${BASE_URL}/comment/${id}`,
    POST: `${BASE_URL}/comment`,
    DELETE: (id: string) => `${BASE_URL}/comment/${id}`,
  },
};

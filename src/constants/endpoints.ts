const BASE_URL = 'https://givgai-api.devbstaging.com/api/v1';

export const ENDPOINTS = {
  CATEGORY: {
    GET_ALL: `${BASE_URL}/category`,
    GET_ONE: (id: string) => `${BASE_URL}/category/${id}`,
  },
  COMMENT: {
    GET_ALL: `${BASE_URL}//comment`,
    GET_BY_ID: (id: string) => `${BASE_URL}/comment/${id}`,
    CREATE: `${BASE_URL}/comment`,
  },
};

const BASE_URL = 'https://gvigai-api.devbstaging.com/api/v1';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    RENEW_TOKEN: `${BASE_URL}/auth/renew-token`,
  },
  CATEGORY: {
    GET_ALL: `${BASE_URL}/category`,
    GET_ONE: (id: string) => `${BASE_URL}/category/${id}`,
    CREATE: `${BASE_URL}/category`,
    UPDATE: `${BASE_URL}/category`,
    DELETE: (id: string) => `${BASE_URL}/category/${id}`,
  },
  QUESTION: {
    CREATE: `${BASE_URL}/interview-questions`,
    UPDATE: (id: string) => `${BASE_URL}/interview-questions/${id}`,
    GET_ALL: `${BASE_URL}/interview-questions`,
    GET_ONE: (id: string) => `${BASE_URL}/interview-questions/${id}`,
    DELETE: (id: string) => `${BASE_URL}/interview-questions/${id}`,
  },
  COMMENT: {
    GET_ALL: `${BASE_URL}/comments`,
    GET_ONE: (id: string) => `${BASE_URL}/comments/${id}`,
    GET_ALL_BY_QUESTION: (questionId: number) => `${BASE_URL}/interview-questions/${questionId}/comments`,
    POST: (questionId: number) => `${BASE_URL}/interview-questions/${questionId}/comments`,
    DELETE: (id: string) => `${BASE_URL}/comments/${id}`,
    UPDATE: `${BASE_URL}/comments`,
  },
};

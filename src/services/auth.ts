import axios from 'axios';
import { ENDPOINTS } from '../constants/endpoints';
import Cookies from 'js-cookie';

async function renewToken(): Promise<Object | null> {
    try {
        const result = await axios.get(ENDPOINTS.AUTH.RENEW_TOKEN, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('refreshJwtToken')}`,
            },
        });
        const token = result.data.token;
        const refreshJwtToken = result.data.refreshToken;
        setCookies(token, refreshJwtToken);
        return getUser();
    } catch (error) {
        removeCookies();
        return null;
    }
  }
  
  function setCookies(cookie1: string, cookie2: string) {
    Cookies.set('jwtToken', cookie1);
    Cookies.set('refreshJwtToken', cookie2);
  }
  
  function removeCookies(){
    Cookies.remove('jwtToken');
    Cookies.remove('refreshJwtToken');
  }
  
  function getUser() {
    const token = Cookies.get('jwtToken');
    
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const decodedJwt = JSON.parse(window.atob(base64));

      const user : Object = decodedJwt;
      return user;
    }
    return null;
  }
  
  function getToken() {
    return Cookies.get('jwtToken');
  }
  
  const authService = {
    renewToken,
    setCookies,
    removeCookies,
    getUser,
    getToken
  };
  
  export default authService;
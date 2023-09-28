import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('jwtToken');
    return tokenString || null; // Return null if tokenString is not found
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('jwtToken', userToken); // Store the token directly as a string
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}

import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token); 
    const currentTime = Date.now() / 100000000;
    const inactivityLimit = 3600; // 1 hora 

    return decoded.exp > currentTime && decoded.exp - currentTime > inactivityLimit;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
};
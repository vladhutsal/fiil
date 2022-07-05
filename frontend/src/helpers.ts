import { TypeAuthHeaders } from './interfaces';

export const compileUnit8Array = (base64: string): Uint8Array => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes as Uint8Array;
};

export const getAuthHeader = (token: string): TypeAuthHeaders => (
  { headers: { Authorization: `Bearer ${token}` } }
);

export const saveAuthToken = (token: string): void => localStorage.setItem('token', token);
export const getAuthToken = (): string | null => localStorage.getItem('token');

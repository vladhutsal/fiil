import { TypeRequestHeaders } from './interfaces';

export const compileUnit8Array = (base64: string): Uint8Array => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes as Uint8Array;
};

export const getAuthHeader = (token: string): TypeRequestHeaders => (
  { headers: { Authorization: `Bearer ${token}` } }
);

export const saveLocalAuthToken = (token: string): void => localStorage.setItem('token', token);
export const getLocalAuthToken = (): string | null => localStorage.getItem('token');
export const removeLocalAuthToken = (): void => localStorage.removeItem('token');

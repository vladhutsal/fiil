// no domain name for the fiil for now, using an external gcp ip 34.140.235.226
export const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost/api'
  : 'http://34.140.235.226/api';

console.log(API_URL);

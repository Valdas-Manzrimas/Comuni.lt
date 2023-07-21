// auth-header.ts
export default function authHeader() {
  const token = localStorage.getItem('x-access-token');
  console.log('Token from authHeader:', token);
  if (token) {
    return { 'x-access-token': token };
  } else {
    return {};
  }
}

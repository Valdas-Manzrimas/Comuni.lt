// auth-header.ts
export default function authHeader() {
  const token = localStorage.getItem('x-access-token');
  console.log('Token from authHeader:', token);
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  } else {
    return {};
  }
}

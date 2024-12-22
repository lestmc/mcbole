export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === 'admin';
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}; 
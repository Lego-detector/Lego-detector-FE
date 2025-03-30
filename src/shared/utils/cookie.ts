import Cookies from 'js-cookie';

export const setCredentials = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, {
    expires: 1,
    secure: true,
    sameSite: 'Lax',
  });
  Cookies.set('refreshToken', refreshToken, {
    expires: 7,
    secure: true,
    sameSite: 'Lax',
  });
};

export const getCredentials = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  return { accessToken, refreshToken };
};

export const removeCredentials = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { UserProfile } from '@/modules/home/_types/user.type';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || '';

export const setCredentials = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, {
    expires: 3,
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

export const setUserProfile = (profile: UserProfile) => {
  const encryptedProfile = CryptoJS.AES.encrypt(
    JSON.stringify(profile),
    SECRET_KEY,
  ).toString();

  Cookies.set('userProfile', encryptedProfile, {
    expires: 3,
    secure: true,
    sameSite: 'Lax',
  });
};

export const getUserProfile = (): UserProfile | null => {
  const encryptedProfile = Cookies.get('userProfile');

  if (encryptedProfile) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedProfile, SECRET_KEY);
      const decryptedProfile = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedProfile) {
        return JSON.parse(decryptedProfile) as UserProfile;
      }
    } catch (error) {
      console.error('Error decrypting user profile:', error);
    }
  }

  return null;
};

export const removeUserProfile = () => {
  Cookies.remove('userProfile');
};
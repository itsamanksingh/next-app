'use client';

import { useEffect, useState } from 'react';

const Avatar = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Function to get data from localStorage
    const getFromLocalStorage = (key) => {
      if (typeof window === 'undefined') return null;
      
      try {
        const value = localStorage.getItem(key);
        return value ? decodeURIComponent(value) : null;
      } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return null;
      }
    };

    // Function to get cookie value by name (fallback)
    const getCookie = (name) => {
      if (typeof document === 'undefined') return null;
      
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(";").shift());
      }
      return null;
    };

    // Get email and name from localStorage first, then fallback to cookies
    const emailFromStorage = getFromLocalStorage('user_email');
    const nameFromStorage = getFromLocalStorage('user_name');
    
    const emailFromCookie = getCookie('email');
    const nameFromCookie = getCookie('name');
    
    // Prioritize localStorage over cookies
    if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else if (emailFromCookie) {
      setEmail(emailFromCookie);
    }    
    if (nameFromStorage) {
      setName(nameFromStorage);
    } else if (nameFromCookie) {
      setName(nameFromCookie);
    }
  }, []);

  // Get first letter from name if available, otherwise from email (without punctuation)
  const getInitial = () => {
    let initial = '';
    
    if (name?.trim()) {
      // Get first letter from name, skip punctuation
      const nameChars = name.trim().split('');
      for (let char of nameChars) {
        if (/[a-zA-Z]/.test(char)) {
          initial = char.toUpperCase();
          break;
        }
      }
    } else if (email?.trim()) {
      // Get first letter from email, skip punctuation
      const emailChars = email.trim().split('');
      for (let char of emailChars) {
        if (/[a-zA-Z]/.test(char)) {
          initial = char.toUpperCase();
          break;
        }
      }
    }    
    return initial;
  };

  const firstLetter = getInitial();

  return (
    <div className="avatar-container" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F8F6F3', color: '#A57F28', fontWeight: '600', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', lineHeight: '24px'}}>
      {firstLetter}
    </div>
  );
};

export default Avatar;
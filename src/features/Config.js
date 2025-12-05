const API_BASE_URLS = {
  auth8: process.env.NEXT_PUBLIC_AUTH8_BASEURL,
  auth12: process.env.NEXT_PUBLIC_AUTH12_BASEURL,
  auth13: process.env.NEXT_PUBLIC_AUTH13_BASEURL,
};

export const API_URL = {
  SOCIAL_GOOGLE_SIGNUP: `${API_BASE_URLS.auth8}`,
  MICROSOFT_SIGNUP: `${API_BASE_URLS.auth12}`,
  APPLE_SIGNUP: `${API_BASE_URLS.auth13}`,
  LOG_OUT: `/logout`,
};
const API_BASE_URLS = {
  auth: process.env.NEXT_PUBLIC_AUTH_BASEURL,
};

export const API_URL = {

  SOCIAL_GOOGLE_SIGNUP: `${API_BASE_URLS.auth}/authorize/google`,
  MICROSOFT_SIGNUP: `${API_BASE_URLS.auth}/microsoft/validate`,
  APPLE_SIGNUP: `${API_BASE_URLS.auth}/callback`,
  LOG_OUT: `${API_BASE_URLS.auth}/logout`,
};

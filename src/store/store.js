import { configureStore } from "@reduxjs/toolkit";
import authSocialSignupReducer from "../features/auth/AuthSocialSignUp";

// const store = configureStore({
//     reducer: {
//         auth_social:authSocialSignupReducer
//     }
// })

// export default store;

const store = () =>
  configureStore({
    reducer: {
      auth_social: authSocialSignupReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for react-query compatibility
      }),
    devTools: { trace: true, traceLimit: 25 },
  });

export { store };

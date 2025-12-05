// import React, { useEffect } from 'react';
// import { PublicClientApplication } from "@azure/msal-browser";
// import { MsalProvider, useMsal } from "@azure/msal-react";
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { socialMicroSoftSignUp } from '@/features/auth/AuthCallFunctions';
// import LoginSignupPopup from '../LoginSignupPopup';


// const msalConfig = {
//   auth: {
//     clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID,
//     authority: "https://login.microsoftonline.com/common",
//     redirectUri: process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URL,
//   },
//   cache: {
//     cacheLocation: "sessionStorage",
//   }
// };

// // Important: Updated scopes to match what's configured in Azure AD
// const loginRequest = {
//   scopes: ["user.read"],
// };

// const msalInstance = new PublicClientApplication(msalConfig);

// const MicrosoftButton = () => {
//   const dispatch = useDispatch()
//   const { instance } = useMsal();


//   const { microsoft_signup_success, microsoft_signup_status_code, access_token, register_data } = useSelector((state) => state.auth_social);

//   useEffect(() => {
//     const status = String(microsoft_signup_status_code);

//     if (status === '200') {
//       // toast.success(microsoft_signup_success);

//       if (access_token) {
//         let user_data = {
//           email: register_data?.email,
//           name: register_data?.name,
//           account_type: register_data?.account_type,
//           word_count: register_data?.word_count,
//           plan_type: register_data?.plan_type
//         }
//         localStorage.setItem("usrVf", register_data?.is_verified);
//         localStorage.setItem("user_data", JSON.stringify(user_data));
//         localStorage.setItem('access_token', JSON.stringify(access_token));
//         document.cookie = `access_token=${access_token}; path=/; SameSite=None; Secure`;
//         document.cookie = `email=${encodeURIComponent(register_data?.email)}; path=/; SameSite=None; Secure`;
//         document.cookie = `name=${encodeURIComponent(register_data?.name)}; path=/; SameSite=None; Secure`;
//         document.cookie = `account_type=${encodeURIComponent(register_data?.account_type)}; path=/; SameSite=None; Secure`;
//         document.cookie = `word_count=${encodeURIComponent(register_data?.word_count)}; path=/; SameSite=None; Secure`;
//         document.cookie = `plan_type=${encodeURIComponent(register_data?.plan_type)}; path=/; SameSite=None; Secure`;
//         document.cookie = `usrVf=${encodeURIComponent(register_data?.is_verified)}; path=/; SameSite=None; Secure`;

//       }
//     }
//   }, [microsoft_signup_status_code]);

//   const handleMicrosoftLogin = async () => {
//     try {
//       const response_microsoft = await instance.loginPopup(loginRequest);

//       const accessToken = response_microsoft.accessToken;
//       dispatch(socialMicroSoftSignUp(accessToken))
//     } catch (error) {
//       console.error("❌ Microsoft login error:", error);
//     }
//   };



//   return (
//     <>
//       <button
//         className="flex items-center justify-center max-w-[300px] w-full h-[40px] gap-[4px] px-[11px] py-[11px] border border-[#E8E8E8] rounded-full hover:bg-gray-100 cursor-pointer"
//         onClick={handleMicrosoftLogin}
//       >
//         <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
//           <path d="M12.1042 11.6035H4.5V3.99902H12.1042V11.6035Z" fill="#F1511B" />
//           <path d="M20.5025 11.6035H12.8984V3.99902H20.5025V11.6035Z" fill="#80CC28" />
//           <path d="M12.104 20H4.5V12.3955H12.104V20Z" fill="#00ADEF" />
//           <path d="M20.5025 20H12.8984V12.3955H20.5025V20Z" fill="#FBBC09" />
//         </svg>
//         <span className="welcom-sub-text [@media(min-width:412px)]:flex">Sign up with Microsoft</span>
//       </button>

//       {access_token && (
//         <LoginSignupPopup
//           title={register_data.is_new ? "Signup Successfully" : 'Success'}
//           message={register_data.is_new ? "Your account has been created!" : 'Signin Successfully'}
//           type="success"
//           accessToken={access_token}
//           id={register_data.is_new ? 'new-user' : 'already-exist-user'}
//         />
//       )}
//     </>
//   );
// };


// const MicrosoftSignup = () => (
//   <MsalProvider instance={msalInstance}>
//     <MicrosoftButton />
//   </MsalProvider>
// );



const MicrosoftSignup = () => {
  return (
    <button
      className="flex items-center justify-center w-full w-[132px] gap-[4px] px-[11px] py-[11px] border border-[#E8E8E8] rounded-full hover:bg-gray-100"
    >
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M12.1042 11.6035H4.5V3.99902H12.1042V11.6035Z" fill="#F1511B" />
        <path d="M20.5025 11.6035H12.8984V3.99902H20.5025V11.6035Z" fill="#80CC28" />
        <path d="M12.104 20H4.5V12.3955H12.104V20Z" fill="#00ADEF" />
        <path d="M20.5025 20H12.8984V12.3955H20.5025V20Z" fill="#FBBC09" />
      </svg>
      <span className="welcom-sub-text hidden [@media(min-width:412px)]:flex">Microsoft</span>
    </button>
  );
};

export default MicrosoftSignup;

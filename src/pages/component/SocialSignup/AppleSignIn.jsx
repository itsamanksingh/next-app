import React, { useEffect } from 'react'
import { AppleSignUp } from '@/features/auth/AuthCallFunctions';
import AppleSignin from "react-apple-signin-auth";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoginSignupPopup from '../LoginSignupPopup';

const AppleSignIn = () => {

  const dispatch = useDispatch();
  const { apple_signup_success, apple_signup_status_code, access_token, register_data } = useSelector((state) => state.auth_social);

  useEffect(() => {
    const status = String(apple_signup_status_code);
    if (status === '200') {
      // toast.success(apple_signup_success);

      if (access_token) {
        let user_data = {
          email: register_data?.email,
          name: register_data?.name,
          account_type: register_data?.account_type,
          word_count: register_data?.word_count,
          plan_type: register_data?.plan_type
        }
        localStorage.setItem("user_data", JSON.stringify(user_data));
        localStorage.setItem('access_token', JSON.stringify(access_token));
        localStorage.setItem("usrVf", register_data?.is_verified);

        // document.cookie = `access_token=${access_token}; path=/; domain=.localhost; SameSite=None; Secure`;
        document.cookie = `access_token=${access_token}; path=/; SameSite=None; Secure`;

        document.cookie = `email=${encodeURIComponent(register_data?.email)}; path=/;  SameSite=None; Secure`;
        document.cookie = `name=${encodeURIComponent(register_data?.name)}; path=/;  SameSite=None; Secure`;
        document.cookie = `account_type=${encodeURIComponent(register_data.account_type)}; path=/; SameSite=None; Secure`;
        document.cookie = `word_count=${encodeURIComponent(register_data.word_count)}; path=/; SameSite=None; Secure`;
        document.cookie = `plan_type=${encodeURIComponent(register_data?.plan_type)}; path=/; SameSite=None; Secure`;
        document.cookie = `usrVf=${encodeURIComponent(register_data?.is_verified)}; path=/; SameSite=None; Secure`;

      }
    }
  }, [apple_signup_status_code, apple_signup_success]);

  const handleSuccess = async (response) => {

    const { authorization } = response;
    const id_token = authorization?.id_token;
    const code = authorization?.code;
    let resdata = {
      id_token: id_token,
      code: code,
      login_source: 'web'
    }
    try {
      dispatch(AppleSignUp(resdata))
    } catch (err) {
      console.error("Error sending Apple login to backend:", err);
    }
  };

  const handleError = (error) => {
    console.error("Apple login failed:", error);
  };


  return (
    <>
      <AppleSignin
        authOptions={{
          clientId: `${process.env.NEXT_PUBLIC_APPLE_CLIENT_ID}`, // e.g., com.example.web
          scope: "name email",
          redirectURI: `${process.env.NEXT_PUBLIC_APPLE_REDIRECT_URL}`,
          state: "state",
          usePopup: true,
        }}
        onSuccess={handleSuccess}
        onError={handleError}
        render={(props) => (
          <button className="flex items-center justify-center max-w-[300px] w-full h-[40px] gap-[4px] px-[11px] py-[11px] border border-[#E8E8E8] rounded-full  hover:bg-gray-100 cursor-pointer" onClick={props.onClick}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.1916 12.5316C17.2175 15.1042 19.6373 15.9603 19.6641 15.9712C19.6436 16.0316 19.2774 17.1913 18.3892 18.3891C17.6214 19.4247 16.8245 20.4565 15.5692 20.4779C14.3357 20.4989 13.939 19.8029 12.5288 19.8029C11.119 19.8029 10.6783 20.4565 9.51065 20.4989C8.29893 20.5412 7.37621 19.379 6.60202 18.3472C5.02004 16.2366 3.81108 12.3832 5.4344 9.78202C6.24084 8.49028 7.682 7.6723 9.24625 7.65132C10.4361 7.63038 11.5592 8.39005 12.2866 8.39005C13.0136 8.39005 14.3784 7.47648 15.8131 7.61065C16.4138 7.63372 18.0998 7.83455 19.1825 9.29694C19.0952 9.34685 17.1707 10.3807 17.1916 12.5316ZM14.8734 6.2143C15.5167 5.49571 15.9497 4.49535 15.8316 3.5C14.9043 3.53439 13.783 4.07022 13.1179 4.78843C12.5218 5.42443 11.9998 6.44239 12.1406 7.41804C13.1742 7.49184 14.23 6.93336 14.8734 6.2143Z" fill="black" />
            </svg>
            <span className="welcom-sub-text [@media(min-width:412px)]:flex">Sign up with Apple</span>

          </button>
        )}
      />

      {access_token && (
        <LoginSignupPopup
          title={register_data.is_new ? "Signup Successfully" : 'Success'}
          message={register_data.is_new ? "Your account has been created!" : 'Signin Successfully'}
          type="success"
          accessToken={access_token}
          id={register_data.is_new ? 'new-user' : 'already-exist-user'}
        />
      )}
    </>
  )
}

export default AppleSignIn
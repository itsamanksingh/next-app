import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, GoogleOAuthProvider, useGoogleOneTapLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { socialGoogleSignUp } from "@/features/auth/AuthCallFunctions";
import LoginSignupPopup from "@/pages/component/LoginSignupPopup";

const SocialGoogleSignup = () => {
  const googleLoginRef = useRef(null);

  const dispatch = useDispatch();
  const { google_signup_success, google_signup_status_code, access_token, register_data } = useSelector((state) => state.auth_social);

  useEffect(() => {
    const status = String(google_signup_status_code);

    if (status === '200') {
      // toast.success(google_signup_success);

      if (access_token) {
        let user_data = {
          email: register_data?.email,
          name: register_data?.name,
          picture: register_data?.picture,
          account_type: register_data?.account_type,
          word_count: register_data?.word_count,
          plan_type: register_data?.plan_type
        }
        localStorage.setItem("user_data", JSON.stringify(user_data));
        localStorage.setItem("usrVf", register_data?.is_verified);
        localStorage.setItem('access_token', JSON.stringify(access_token));
        document.cookie = `usrVf=${encodeURIComponent(register_data?.is_verified)}; path=/; SameSite=None; Secure`;
        document.cookie = `access_token=${access_token}; path=/;  SameSite=None; Secure`;
        document.cookie = `email=${encodeURIComponent(register_data?.email)}; path=/;  SameSite=None; Secure`;
        document.cookie = `name=${encodeURIComponent(register_data?.name)}; path=/;  SameSite=None; Secure`;
        document.cookie = `picture=${encodeURIComponent(register_data?.picture)}; path=/;  SameSite=None; Secure`;
        document.cookie = `account_type=${encodeURIComponent(register_data?.account_type)}; path=/; SameSite=None; Secure`;
        document.cookie = `word_count=${encodeURIComponent(register_data?.word_count)}; path=/; SameSite=None; Secure`;
        document.cookie = `plan_type=${encodeURIComponent(register_data?.plan_type)}; path=/; SameSite=None; Secure`;
      }
    }
  }, [google_signup_status_code, google_signup_success]);

  const handleSocialSignup = async (response) => {
    const token = encodeURIComponent(response?.credential);
    const login_source = "Web";

    let data = {
      token: token,
      login_source: login_source
    };
    dispatch(socialGoogleSignUp(data));
  };

  useGoogleOneTapLogin({
    onSuccess: () => handleSocialSignup(),
    onError: () => toast.error('Google login failed'),
    auto_select: false,
    prompt: 'select_account',
  });

  return (
    <>
      <GoogleLogin
        ref={googleLoginRef}
        onSuccess={handleSocialSignup}
        onError={() => toast.error("Google login failed")}
        useOneTap
        text="signup_with" // Changed from default
        size="large"
        shape="pill"
        width="300"
        auto_select={false}
        render={({ onClick }) => (
          <button
            className="flex items-center justify-center w-full max-w-[300px] gap-[4px] px-[11px] py-[11px] border border-[#E8E8E8] rounded-full hover:bg-gray-100 cursor-pointer"
            onClick={login}
          >
            {/* Custom SVG for the button */}
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.334 12.1879C21.334 11.4891 21.2761 10.9791 21.1509 10.4502H13.0078V13.6045H17.7876C17.6913 14.3884 17.1709 15.569 16.0145 16.3622L15.9982 16.4678L18.5729 18.4226L18.7513 18.44C20.3895 16.9573 21.334 14.7756 21.334 12.1879Z"
                fill="#4285F4"
              />
              <path
                d="M13.0058 20.5004C15.3475 20.5004 17.3134 19.7448 18.7493 18.4415L16.0124 16.3638C15.2801 16.8643 14.2971 17.2137 13.0058 17.2137C10.7123 17.2137 8.76564 15.731 8.07173 13.6816L7.97002 13.6901L5.29282 15.7206L5.25781 15.816C6.68404 18.5926 9.61362 20.5004 13.0058 20.5004Z"
                fill="#34A853"
              />
              <path
                d="M8.07106 13.6805C7.88796 13.1516 7.782 12.5849 7.782 11.9994C7.782 11.4139 7.88796 10.8472 8.06142 10.3183L8.05657 10.2057L5.34583 8.14258L5.25714 8.18392C4.66932 9.33613 4.33203 10.63 4.33203 11.9994C4.33203 13.3688 4.66932 14.6627 5.25714 15.8149L8.07106 13.6805Z"
                fill="#FBBC05"
              />
              <path
                d="M13.0058 6.78657C14.6344 6.78657 15.7329 7.476 16.3594 8.05214L18.8071 5.70995C17.3038 4.34054 15.3475 3.5 13.0058 3.5C9.61362 3.5 6.68404 5.40772 5.25781 8.18431L8.0621 10.3187C8.76564 8.26934 10.7123 6.78657 13.0058 6.78657Z"
                fill="#EB4335"
              />
            </svg>
            <span className="welcom-sub-text hidden [@media(min-width:412px)]:flex">Continue with Google</span>
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
  );
};

export default SocialGoogleSignup

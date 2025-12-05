import { createSlice } from "@reduxjs/toolkit";
import { AppleSignUp, socialGoogleSignUp, socialMicroSoftSignUp } from "./AuthCallFunctions";


const initialState = {
    google_signup_error: '',
    google_signup_loading: false,
    google_signup_success: '',
    google_signup_status_code: '',
    microsoft_signup_error: '',
    microsoft_signup_loading: false,
    microsoft_signup_success: '',
    microsoft_signup_status_code: '',
    apple_signup_error: '',
    apple_signup_loading: false,
    apple_signup_success: '',
    apple_signup_status_code: '',
    access_token: '',
    register_data : {}
};

const authSocialSignupSlice = createSlice({
    name: "auth_social",
    initialState,
    reducers: {
        set_toekn: (state, action) => {
            state.access_token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(socialGoogleSignUp.pending, (state) => {
                state.google_signup_loading = true;
                state.google_signup_error = null;
            })
            .addCase(socialGoogleSignUp.fulfilled, (state, action) => {
                state.google_signup_success = action?.payload?.message
                state.google_signup_status_code = action?.payload?.status_code
                state.access_token = action.payload?.access_token
                state.register_data = action.payload
                state.google_signup_loading = false;
            })
            .addCase(socialGoogleSignUp.rejected, (state, action) => {
                state.google_signup_error = action?.payload;
                state.google_signup_loading = false;
            })
            .addCase(socialMicroSoftSignUp.pending, (state) => {
                state.microsoft_signup_loading = true;
                state.microsoft_signup_error = null;
            })
            .addCase(socialMicroSoftSignUp.fulfilled, (state, action) => {
                state.microsoft_signup_success = action?.payload?.data?.message
                state.access_token = action?.payload?.data?.access_token
                state.microsoft_signup_status_code = action?.payload?.status
                state.register_data = action?.payload?.data
                state.microsoft_signup_loading = false;
            })
            .addCase(socialMicroSoftSignUp.rejected, (state, action) => {
                state.microsoft_signup_error = action?.payload;
                state.microsoft_signup_loading = false;
            })
            .addCase(AppleSignUp.pending, (state) => {
                state.apple_signup_loading = true;
                state.apple_signup_error = null;
            })
            .addCase(AppleSignUp.fulfilled, (state, action) => {
                state.apple_signup_success = action?.payload?.message
                state.access_token = action?.payload?.access_token
                state.apple_signup_status_code = action?.payload?.status_code
                state.register_data = action?.payload
                state.apple_signup_loading = false;
            })
            .addCase(AppleSignUp.rejected, (state, action) => {
                state.apple_signup_error = action?.payload;
                state.apple_signup_loading = false;
            })
    }
});

export const { set_toekn } = authSocialSignupSlice.actions;
export default authSocialSignupSlice.reducer;

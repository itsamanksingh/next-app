import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../Config";
// import { toast } from "react-toastify";



export const socialGoogleSignUp = createAsyncThunk(
  "socialGoogleSignUp",
  async (payload, { rejectWithValue }) => {
    try {
      const { token, login_source } = payload;

      const response = await axios.post(
        `${API_URL.SOCIAL_GOOGLE_SIGNUP}`, // no query params here
        {
          token: token,
          login_source: login_source,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // correct for Axios
        }
      );

      if (!response || !response.data) {
        throw new Error("Invalid response from the server.");
      }
      return response.data;
    } catch (error) {
      // toast.error(error.response.data?.detail);
      return rejectWithValue(error.response || "An error occurred");
    }
  }
);

export const socialMicroSoftSignUp = createAsyncThunk(
  "socialMicrosoftSignUp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_URL.MICROSOFT_SIGNUP,
        { token: payload }, // Send token in the body
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (!response || !response.data) {
        throw new Error("Invalid response from the server.");
      }
      return response;
    } catch (error) {
      // toast.error(error.response.data?.detail);
      return rejectWithValue(error.response || "An error occurred");
    }
  }
);

export const AppleSignUp = createAsyncThunk(
  "apple_signup",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL.APPLE_SIGNUP}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,

      });
      if (!response || !response.data) {
        throw new Error("Invalid response from the server.");
      }
      return response.data;
    } catch (error) {
      // toast.error(error.response.data?.detail);
      return rejectWithValue(error.response || "An error occurred");
    }
  }
);





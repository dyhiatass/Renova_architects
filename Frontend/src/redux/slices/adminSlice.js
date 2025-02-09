import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Hostname from "../../Hostname";

const tokenFromLocalStorage = localStorage.getItem("token");
const isFirstLoginFromLocalStorage = localStorage.getItem("isFirstLogin") === "true";

//  Action pour la connexion
export const loginAdmin = createAsyncThunk("admin/loginAdmin", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${Hostname}/admin/login`, credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Erreur de connexion" });
  }
});

// Action pour changer le mot de passe
export const changePassword = createAsyncThunk("admin/changePassword", async ({ newPassword }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${Hostname}/admin/changePassword`,
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Erreur lors du changement du mot de passe" });
  }
});

//  Redux Slice
export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    token: tokenFromLocalStorage || null,
    isFirstLogin: isFirstLoginFromLocalStorage || false,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isFirstLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isFirstLogin");
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        const { token, isFirstLogin } = action.payload;
        state.loading = false;
        state.admin = action.payload;
        state.token = token;
        state.isFirstLogin = isFirstLogin;

        // Stocker dans le localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("isFirstLogin", isFirstLogin);
        state.successMessage = "Connexion réussie !";
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isFirstLogin = action.payload.isFirstLogin;
        state.successMessage = "Mot de passe changé avec succès !";

        // Mettre à jour dans le localStorage
        localStorage.setItem("isFirstLogin", action.payload.isFirstLogin);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, clearMessages } = adminSlice.actions;
export default adminSlice.reducer;

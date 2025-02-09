import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Hostname from "../../Hostname"; 

// Récupérer tous les contacts
export const fetchUsers = createAsyncThunk(
  "contacts/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Hostname}/contact`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur de récupération des contacts");
    }
  }
);
export const submitContact = createAsyncThunk(
  "contacts/submitContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Hostname}/contact`, contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors de l'envoi du formulaire");
    }
  }
);
//  Ajouter un contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Hostname}/contact`, contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors de l'ajout du contact");
    }
  }
);

// 🔹 3️⃣ Supprimer plusieurs contacts
export const deleteUsers = createAsyncThunk(
  "contacts/deleteUsers",
  async (userIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Hostname}/contact/delete`, { ids: userIds });
      return { ids: userIds, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur de suppression");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Ajouter `submitContact` ici
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Message envoyé avec succès.";
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // ✅ Les autres actions déjà existantes
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.contacts = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(addContact.pending, (state) => { state.loading = true; })
      .addCase(addContact.fulfilled, (state, action) => { state.loading = false; state.contacts.push(action.payload); })
      .addCase(addContact.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteUsers.pending, (state) => { state.loading = true; })
      .addCase(deleteUsers.fulfilled, (state, action) => { state.loading = false; state.contacts = state.contacts.filter((contact) => !action.payload.ids.includes(contact._id)); })
      .addCase(deleteUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearMessage } = contactSlice.actions;
export default contactSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Hostname from "../../Hostname"; // Import du fichier de configuration

//  Action pour soumettre un devis
export const submitDevis = createAsyncThunk(
  "devis/submitDevis",
  async (devisData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Hostname}/devis`, devisData);
      return response.data; //  Retourne la réponse du serveur
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors de la soumission du devis");
    }
  }
);

// Action pour récupérer tous les devis
export const fetchAllDevis = createAsyncThunk(
  "devis/fetchAllDevis",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Hostname}/devis`);
      return response.data; // Retourne la liste des devis
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors du chargement des devis");
    }
  }
);

// Action pour récupérer un devis par ID
export const fetchDevisById = createAsyncThunk(
  "devis/fetchDevisById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Hostname}/devis/${id}`);
      return response.data; // Retourne les détails du devis
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors du chargement du devis");
    }
  }
);

// 🔹 4️⃣ Action pour mettre à jour un devis
export const updateDevis = createAsyncThunk(
  "devis/updateDevis",
  async ({ id, devisData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${Hostname}/devis/${id}`, devisData);
      return response.data; // Retourne le devis mis à jour
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors de la mise à jour du devis");
    }
  }
);

// Action pour supprimer un devis
export const deleteDevis = createAsyncThunk(
  "devis/deleteDevis",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${Hostname}/devis/${id}`);
      return id; // Retourne l'ID du devis supprimé
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors de la suppression du devis");
    }
  }
);

// 🔹 6️⃣ Action pour récupérer les statistiques des devis
export const fetchDevisStats = createAsyncThunk(
  "devis/fetchDevisStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Hostname}/devis/stats`);
      return response.data; // ✅ Retourne les statistiques des devis
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur lors du chargement des statistiques");
    }
  }
);

// 🔹 7️⃣ Création du slice Redux pour la gestion des devis
export const devisSlice = createSlice({
  name: "devis",
  initialState: {
    devisList: [],
    selectedDevis: null,
    stats: null,
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
      // 🔹 Récupération de tous les devis
      .addCase(fetchAllDevis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDevis.fulfilled, (state, action) => {
        state.loading = false;
        state.devisList = action.payload; // ✅ Stocke les devis dans Redux
      })
      .addCase(fetchAllDevis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Récupération d'un devis par ID
      .addCase(fetchDevisById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevisById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDevis = action.payload; // ✅ Stocke le devis sélectionné
      })
      .addCase(fetchDevisById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Soumission d'un devis
      .addCase(submitDevis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDevis.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message; // ✅ Affiche un message de succès
      })
      .addCase(submitDevis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Mise à jour d'un devis
      .addCase(updateDevis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDevis.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Devis mis à jour avec succès.";
      })
      .addCase(updateDevis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Suppression d'un devis
      .addCase(deleteDevis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDevis.fulfilled, (state, action) => {
        state.loading = false;
        state.devisList = state.devisList.filter(devis => devis.id !== action.payload); // Supprime le devis du store
      })
      .addCase(deleteDevis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Récupération des statistiques des devis
      .addCase(fetchDevisStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevisStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload; // ✅ Stocke les statistiques des devis
      })
      .addCase(fetchDevisStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//Export des actions et du reducer
export const { clearMessage } = devisSlice.actions;
export default devisSlice.reducer;

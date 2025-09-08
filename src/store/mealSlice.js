import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";

// ✅ Appwrite Client
const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

const databases = new Databases(client);

// IDs
const DB_ID = conf.appwriteDbId;
const Collection_ID = conf.appwriteCollectionId;

// ✅ Fetch all meals once on load
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  try {
    const response = await databases.listDocuments(DB_ID, Collection_ID, [
      // fetch maximum items in one call
      // Appwrite allows limit up to 100, so we may need to paginate
    ]);

    let allMeals = [];
    let page = 0;
    const limit = 100;

    while (true) {
      const res = await databases.listDocuments(DB_ID, Collection_ID, [
        // fetch 100 items per request
        Query.limit(limit),
        Query.offset(page * limit),

      ]);
      allMeals = [...allMeals, ...res.documents];
      if (res.documents.length < limit) break;
      page++;
    }

    return allMeals;
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
});

const mealSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [], // all meals (293)
    filteredMeals: [], // filtered view
    visibleMeals: [], // for lazy loading
    loading: false,
    error: null,
    searchQuery: "",
    itemsPerPage: 20, // how many to show at once
    currentPage: 1,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
      // filter meals based on search
      state.filteredMeals = state.meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(state.searchQuery)
      );
      // reset pagination
      state.currentPage = 1;
      state.visibleMeals = state.filteredMeals.slice(0, state.itemsPerPage);
    },
    loadMoreMeals: (state) => {
      state.currentPage++;
      const end = state.currentPage * state.itemsPerPage;
      state.visibleMeals = state.filteredMeals.slice(0, end);
    },
    clearMeals: (state) => {
      state.meals = [];
      state.filteredMeals = [];
      state.visibleMeals = [];
      state.searchQuery = "";
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
        state.filteredMeals = action.payload;
        state.visibleMeals = action.payload.slice(0, state.itemsPerPage);
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, loadMoreMeals, clearMeals } = mealSlice.actions;
export default mealSlice.reducer;

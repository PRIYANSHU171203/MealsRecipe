import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/config"; // ✅ use single Service.js

// ✅ Fetch all meals (with pagination support)
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  try {
    let allMeals = [];
    let page = 0;
    const limit = 100;

    while (true) {
      const res = await service.getMeals({
        limit,
        offset: page * limit,
      });

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

// ✅ Update Meal
export const updateMeal = createAsyncThunk(
  "meals/updateMeal",
  async ({ id, data }) => {
    const res = await service.updateMeal(id, data);
    return res;
  }
);

// ✅ Delete Meal
export const deleteMeal = createAsyncThunk(
  "meals/deleteMeal",
  async (id) => {
    await service.deleteMeal(id);
    return id; // return deleted meal id
  }
);


const mealSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],            // all meals
    filteredMeals: [],    // search results
    visibleMeals: [],     // lazy loaded meals for UI
    loading: false,
    error: null,
    searchQuery: "",
    itemsPerPage: 20,     // meals per page
    currentPage: 1,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();

      // filter meals by search
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
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        const index = state.meals.findIndex(m => m.$id === action.payload.$id);
        if (index !== -1) {
          state.meals[index] = action.payload;
        }
        // Re-apply filter + pagination
        state.filteredMeals = state.meals.filter((meal) =>
          meal.strMeal.toLowerCase().includes(state.searchQuery)
        );
        state.visibleMeals = state.filteredMeals.slice(0, state.currentPage * state.itemsPerPage);
      })
        .addCase(deleteMeal.fulfilled, (state, action) => {
        state.meals = state.meals.filter(m => m.$id !== action.payload);
        state.filteredMeals = state.filteredMeals.filter(m => m.$id !== action.payload);
        state.visibleMeals = state.visibleMeals.filter(m => m.$id !== action.payload);
      });

  },
});

export const { setSearchQuery, loadMoreMeals, clearMeals } = mealSlice.actions;
export default mealSlice.reducer;

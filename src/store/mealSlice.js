import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/db"; // ✅ use single Service.js

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

//  Create Meal
export const createMeal = createAsyncThunk(
  "meals/createMeal",
  async (data) => {
    const res = await service.createMeal(data);
    return res;
  }
);


//  Update Meal
export const updateMeal = createAsyncThunk(
  "meals/updateMeal",
  async ({ id, data }) => {
    const res = await service.updateMeal(id, data);
    return res;
  }
);

//  Delete Meal
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
    searchQueryRaw: "",
    itemsPerPage: 20,     // meals per page
    currentPage: 1,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      // Keep original user input for UI
      const raw = action.payload ? String(action.payload) : "";
      state.searchQueryRaw = raw;

      // Use lowercased value for filtering comparisons+      
      const q = raw.trim().toLowerCase();

      state.filteredMeals = state.meals.filter((meal) => {
        const name = (meal?.strMeal || "").toString().toLowerCase();
        return name.includes(q);
      });

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
      state.searchQueryRaw = "";
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
      .addCase(createMeal.fulfilled, (state, action) => {
        if(!action.payload) return ;
        state.meals.push(action.payload);
        const q = (state.searchQueryRaw || "").trim().toLowerCase();
        state.filteredMeals = state.meals.filter((meal) =>
          (meal?.strMeal || "").toString().toLowerCase().includes(q)
      );
      state.visibleMeals = state.filteredMeals.slice(0, state.currentPage * state.itemsPerPage);
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        if (!action.payload) {
          // nothing to do if payload missing
          return;
        }
        const payloadId = action.payload.$id;
        const index = state.meals.findIndex((m) => m.$id === payloadId);
        if (index !== -1) {
          state.meals[index] = action.payload;
        } else {
          // if not found, optionally push
          state.meals.push(action.payload);
        }
        // Re-apply filter + pagination
         const q = (state.searchQueryRaw || "").trim().toLowerCase();
        state.filteredMeals = state.meals.filter((meal) =>
          (meal?.strMeal || "").toString().toLowerCase().includes(q)
        );
        state.visibleMeals = state.filteredMeals.slice(0, state.currentPage * state.itemsPerPage);
      })
        .addCase(deleteMeal.fulfilled, (state, action) => {
          const id = action.payload;
          if(!id) return ;
        state.meals = state.meals.filter(m => m.$id !== id);
        state.filteredMeals = state.filteredMeals.filter(m => m.$id !== id);
        state.visibleMeals = state.visibleMeals.filter(m => m.$id !== id);
      });

  },
});

export const { setSearchQuery, loadMoreMeals, clearMeals } = mealSlice.actions;
export default mealSlice.reducer;


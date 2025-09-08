import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {SearchInput, MealCard, Loader} from '../components'
import { loadMoreMeals } from "../store/mealSlice";




function AllMeals() {
    const dispatch = useDispatch();
    
  const { visibleMeals, loading, error, filteredMeals } = useSelector(
    (state) => state.meals
  );

  
    return (
    <div className="mx-10 flex flex-col items-center">
      <h1 className="text-xl font-bold">All Meals</h1>

      {/* 🔍 Search inside Meals page */}
      <SearchInput />

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🍲 Meals */}
       <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {visibleMeals.map((meal) => (
          <MealCard key={meal.$id} {...meal} />
        ))}
      </ul>
      {/* 📥 Lazy Load Button */}
      {visibleMeals.length < filteredMeals.length && (
        <button
          onClick={() => dispatch(loadMoreMeals())}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default AllMeals

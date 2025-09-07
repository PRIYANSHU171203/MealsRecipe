import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals, setSearchQuery, loadMoreMeals } from "../../store/mealSlice";
import {Link} from 'react-router-dom'

function MealCard() {
  const dispatch = useDispatch();
  const { visibleMeals, loading, error, searchQuery, filteredMeals } = useSelector(
    (state) => state.meals
  );

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-xl font-bold">Meals</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search meals..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="border-3 p-2 my-3 w-full rounded-2xl font-semibold bg-white outline-none "
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🍲 Meals */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleMeals.map((meal) => (
          <Link key={meal.$id} to ={`/meal/${meal.$id}`}>
          <li  className="p-2 border-2 bg-amber-50 rounded-3xl shadow-xl cursor-pointer hover:-translate-1.5 hover:bg-amber-100 hover:border-4 duration-300 ">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-full border" />
            <p className="mt-2 font-bold ">{meal.strMeal}</p>
          </li>
          </Link>
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

export default MealCard;

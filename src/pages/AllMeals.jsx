import { useDispatch, useSelector } from "react-redux";
import {SearchInput, MealCard, Loader, Button} from '../components'
import { loadMoreMeals } from "../store/mealSlice";
import { ScrollToTopButton } from "../components/Button";



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
        <Button
          onClick={() => dispatch(loadMoreMeals())}
          className="mt-4 p-2  text-white rounded"
        >
          Load More
        </Button>
      )}

      <ScrollToTopButton />
    </div>
  );
}

export default AllMeals

import { SearchInput } from "../components";
import { useSelector } from "react-redux";
import {MealCard} from '../components'
function Home() {
    const { filteredMeals, searchQuery } = useSelector((state) => state.meals);
     const authStatus = useSelector((state) => state.auth.status);

  return (
    <div className="flex flex-col items-center mx-10 mt-5">
      <h1 className="text-2xl font-bold">Welcome to MealsRecipe </h1>
      <p className="mb-4">Search your favorite meal:</p>
      <SearchInput  />

      {/* If not logged in → show warning */}
      {!authStatus && (
        <p className="text-red-600 font-semibold mt-2">
          🔒 You need to log in to use search.
        </p>
      )}

      {/* Show results if user typed something */}
      {authStatus && searchQuery && (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <MealCard key={meal.$id} {...meal} />
            ))
          ) : (
            <p>No meals found.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Home;

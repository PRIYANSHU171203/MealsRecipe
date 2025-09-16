import { Link } from "react-router-dom";

function MealCard({$id, strMeal, strMealThumb}) {
  
  return (
          <Link  to={`/meal/${$id}`}>
            <li className="group p-2 border-2 bg-amber-50 rounded-3xl cursor-pointer 
                 transition-all duration-500 ease-in-out 
                 hover:shadow-2xl hover:scale-105 hover:bg-amber-100 hover:border-amber-300 ">
               <div 
              //  className="w-32 h-32 mx-auto overflow-hidden rounded-full "
              className="w-32 h-32 sm:w-50 sm:h-50 md:w-50 md:h-50 mx-auto overflow-hidden rounded-full flex items-center justify-center"
               >
                  <img
                    src={strMealThumb}
                    alt={strMeal}
                    // className="rounded-full border-2 border-transparent transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:border-amber-400"
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out 
                   group-hover:scale-110"
                  />
                </div>

    {/* Title */}
    <p className="mt-3 font-bold truncate text-center text-gray-700 
                  transition-colors duration-300 group-hover:text-amber-600">
      {strMeal}
    </p>
            </li>
          </Link> 
   
  );
}

export default MealCard;

import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Loader, ConfirmDeleteToast } from "../components";
import {useState, useEffect} from 'react'
import service from '../appwrite/db'
import {toast} from 'react-hot-toast'
import {deleteMeal} from '../store/mealSlice'



export default function MealDetails() {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { meals } = useSelector((state) => state.meals);
  const existingMeal = meals.find((m) => m.$id === id);
  const [meal, setMeal] = useState(existingMeal || null);
  const isAdmin = userData?.labels?.includes("admin");
// ✅ If meal already exists → no loading
  const [loading, setLoading] = useState(!existingMeal);
  const navigate = useNavigate();
  useEffect(() => {
      if (existingMeal) {
        setMeal(existingMeal);
        setLoading(false);
      } else {
        setLoading(true);
        service.getMeal(id).then((res) => {
          if (res) setMeal(res);
          setLoading(false);
        });
      }
  }, [id, meals]);

    if(loading) {
      return <Loader />;
    }
    if (!meal) {
      return <h2 className="text-center mt-10 font-bold">Meal not found</h2>;
    }

    //  Collect ingredients with measures
  const ingredients = (() => {
    if (Array.isArray(meal.ingredients) && meal.ingredients.length) {
      return meal.ingredients
        .map((ing, idx) => {
          const i = typeof ing === "string" ? ing.trim() : "";
          const m = typeof meal.measures?.[idx] === "string" ? meal.measures[idx].trim() : "";
          if (!i) return null;
          return m ? `${m} - ${i}` : i;
        })
        .filter(Boolean);
    }

    
  const out = [];
    for (let i = 1; i <= 25; i++) {
      const ing = typeof meal[`strIngredient${i}`] === "string" ? meal[`strIngredient${i}`].trim() : "";
      const m = typeof meal[`strMeasure${i}`] === "string" ? meal[`strMeasure${i}`].trim() : "";
      if (ing) out.push(m ? `${m} - ${ing}` : ing);
    }
    return out;
  })();

  const getYoutubeId = (url) => {
  if (!url) return null;
  
  // Regex to match YouTube video ID from different URL formats
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};


  // for youtube link
  const youtubeId = getYoutubeId(meal.strYoutube);

    return (
      <div className="relative max-w-3xl mx-auto p-4 bg-[#F8E8EE] rounded-4xl my-5">
        <Link to="/meals" >
        <Button > Back</Button>
        </Link>
        {isAdmin && (
          <div className="absolute top-0 right-4 flex gap-4 mt-4">
            <Link to={`/meal/edit/${meal.$id}`}>
              <Button>Edit Meal</Button>
            </Link>
            <Button
        className="bg-red-500 hover:bg-red-700"
        onClick={() =>
          ConfirmDeleteToast({
            onConfirm: async () => {
              try {
                  await dispatch(deleteMeal(meal.$id)).unwrap();
                  toast.success("Meal deleted successfully!");
                  navigate("/meals");
                } catch (err) {
                  console.error("Delete failed:", err);
                  toast.error("Failed to delete meal. " + (err.message || ""));
                }
            },
          })
        }>
        Delete Meal
      </Button>
        
          </div>
      )}
      

        <h1 className="text-5xl font-extrabold mt-4 text-center">     
              {meal.strMeal}
        </h1>
        <img 
        src={meal.strMealThumb} alt={meal.strMeal} className="w-100 rounded-full my-6 shadow-lg mx-auto" />

        <p className="mt-10">
          <strong>Category : </strong> 
           {meal.strCategory}
        </p>
        <p><strong>Area:</strong> {meal.strArea}</p>

        <h2 className="text-2xl mt-6 font-semibold">
          Ingredients
        </h2>
        <ul className="list-disc ml-6">
          {ingredients.map((item, i) => 
          <li key={i} className="text-gray-700">{item}</li>)}
        </ul>

        <h2 className="text-2xl mt-6 font-semibold">
          Instructions
        </h2>
        <p className="whitespace-pre-line">
          {meal.strInstructions}
        </p>

        {meal.strYoutube && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Watch on YouTube</h2>
            {youtubeId && (
              <iframe 
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="aspect-video rounded-3xl m-4"
              ></iframe>

            )}
            
            
          </div>
        )}
      </div>
    );
  }

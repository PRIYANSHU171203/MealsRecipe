import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Loader } from "../components";
import {useState, useEffect} from 'react'
import service from '../appwrite/config'

export default function MealDetails() {
  const { id } = useParams();
  const { meals } = useSelector((state) => state.meals);

  const existingMeal = meals.find((m) => m.$id === id);

const [meal, setMeal] = useState(existingMeal || null);
// ✅ If meal already exists → no loading
const [loading, setLoading] = useState(!existingMeal);

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
  for (let i = 1; i <= 20; i++) {
    const ing = typeof meal[`strIngredient${i}`] === "string" ? meal[`strIngredient${i}`].trim() : "";
    const m = typeof meal[`strMeasure${i}`] === "string" ? meal[`strMeasure${i}`].trim() : "";
    if (ing) out.push(m ? `${m} - ${ing}` : ing);
  }
  return out;
})();

const getYoutubeId = (url) => {
  if(!url) return null;
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null
};
const youtubeId = getYoutubeId(meal.strYoutube);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-[#F8E8EE] rounded-4xl my-5">
      <Link to="/meals" >
      <Button > Back</Button>
      </Link>
      <h1 className="text-5xl font-extrabold mt-2 text-center">     
            {meal.strMeal}
      </h1>
      <img 
       src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-full my-6 shadow-lg" />

      <p className="mt-3">
        <strong>Category:</strong> 
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
           src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
           title="YouTube video player"
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
           className=" aspect-video rounded-3xl m-4"
           ></iframe>

          )}
          
          
        </div>
      )}
    </div>
  );
}

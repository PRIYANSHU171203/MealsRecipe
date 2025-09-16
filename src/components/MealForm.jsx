import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/db";
import { useSelector, useDispatch } from "react-redux";
import { Button, Loader, Input } from "../components";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import {updateMeal, createMeal} from '../store/mealSlice'


export default function MealForm() {
  const { id } = useParams(); // meal id for edit
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const isAdmin = userData?.labels?.includes("admin");
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState({
    strCategory: "",
    strArea: "",
    strMeal: "",
    strInstructions: "",
    strMealThumb: "",
    strYoutube: "",
    ingredients: Array(25).fill(""),
    measures: Array(25).fill(""),
  });

   // 2️⃣ fetchMeal function
  const fetchMeal = async (mealId) => {
    setLoading(true);
    try {
      const res = await service.getMeal(mealId);
      if (res) {
         const ingredients = [...(res.ingredients || [])]; 
         const measures = [...(res.measures || [])];
         while (ingredients.length < 25) ingredients.push("");
         while (measures.length < 25) measures.push("");

      // Find the last non-empty ingredient or measure
      let lastFilledIndex = 0;
      for (let i = 24; i >= 0; i--) {
        if (ingredients[i] || measures[i]) {
          lastFilledIndex = i + 1;
          break;
        }
      }
        setMeal({
          strCategory: res.strCategory || "",
          strArea: res.strArea || "",
          strMeal: res.strMeal || "",
          strInstructions: res.strInstructions || "",
          strMealThumb: res.strMealThumb || "",
          strYoutube: res.strYoutube || "",
          ingredients,
          measures,
    
        });
        const initialVisible = Math.max(lastFilledIndex+1,5);
        setVisibleCount(Math.min(initialVisible, 25));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch meal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // redirect non-admin
      return;
    }

    if (id) {
      // Editing existing meal
        fetchMeal(id);
    } else {
      setMeal({
      strCategory: "",
      strArea: "",
      strMeal: "",
      strInstructions: "",
      strMealThumb: "",
      strYoutube: "",
      ingredients: Array(25).fill(""),
      measures: Array(25).fill(""),
      });
      setVisibleCount(5); // reset visible ingredient count
      setLoading(false);
    }
  }, [id, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ingredient")) {
      const idx = parseInt(name.split("-")[1]);
      const newIngredients = [...meal.ingredients];
      newIngredients[idx] = value;
      setMeal({ ...meal, ingredients: newIngredients });
    } else if (name.startsWith("measure")) {
      const idx = parseInt(name.split("-")[1]);
      const newMeasures = [...meal.measures];
      newMeasures[idx] = value;
      setMeal({ ...meal, measures: newMeasures });
    } else {
      setMeal({ ...meal, [name]: value });
    }
  };

   const handleAddMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, 25)); // add next 5
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
    if (id) {
     await(dispatch(updateMeal({id, data:meal})).unwrap()); // update meal
      
        toast.success("Meal updated!");
        navigate("/meals");
      
    } else {
      // Create new meal
      const res = await dispatch(createMeal(meal)).unwrap();
        toast.success("Meal added!");
        navigate(`/meal/${res.$id}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Not authorized to perform this action");
  } finally {
    setLoading(false);
  }
  };

  if (loading) return <Loader />;

  return (
    <div className="relative max-w-3xl mx-auto p-4  bg-[#F8E8EE] rounded-4xl my-5">
        
     <h1 className="text-3xl font-bold mb-4">
        {id ? "Edit Meal" : "Add New Meal"}
      </h1>
      <button
      type="button"
      onClick={() => navigate(-1)}   // Go back to previous page
      className="absolute top-3 right-3 hover:text-red-500 text-3xl  text-gray-800  "
    >
      <FontAwesomeIcon icon={faXmarkCircle} bounce />
    </button>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        <Input
          label="Meal Name"
          name="strMeal"
          placeholder="Meal Name"
          value={meal.strMeal}
          onChange={handleChange}
          required
        />
        <Input
          label="Image URL"
          name="strMealThumb"
          placeholder="Image URL"
          value={meal.strMealThumb}
          onChange={handleChange}
          required
        />
        <Input
          label="Category"
          name="strCategory"
          placeholder="Category"
          value={meal.strCategory}
          onChange={handleChange}
        />
        <Input
          label="Area"
          name="strArea"
          placeholder="Area"
          value={meal.strArea}
          onChange={handleChange}
        />
        <Input
          label="Instructions"
          name="strInstructions"
          placeholder="Instructions"
          value={meal.strInstructions}
          onChange={handleChange}
          required
        />
        <Input
          label="YouTube URL"
          name="strYoutube"
          placeholder="YouTube URL"
          value={meal.strYoutube}
          onChange={handleChange}
        />

        <h2 className="font-semibold mt-3">Ingredients & Measures</h2>
        {meal.ingredients.slice(0,visibleCount).map((ing, idx) => (
          <div key={idx} className="flex gap-2 mb-1">
            <Input
              label={`Ingredient ${idx + 1}`}
              type="text"
              name={`ingredient-${idx}`}
              placeholder={`Ingredient ${idx + 1}`}
              value={meal.ingredients[idx]}
              onChange={handleChange}
              className="flex-1"
            />
            <Input
              label={`Measure ${idx + 1}`}
              type="text"
              name={`measure-${idx}`}
              placeholder={`Measure ${idx + 1}`}
              value={meal.measures[idx]}
              onChange={handleChange}
              className="flex-1"
            />
          </div>
        ))}
        {visibleCount < 25 && (
          <Button
            type="button"
            onClick={handleAddMore}
            className="font-bold w-10 text-2xl flex items-center justify-center mx-auto rounded-full bg-violet-600"
          >
           <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
        )}


        <Button type="submit" className="hover:bg-gradient-to-r from-bg-pink-600 via-bg-violet-500 to-pink-600 text-lg font-medium">{id ? "Update Meal" : "Add Meal"}</Button>
      </form>
    </div>
  );
}

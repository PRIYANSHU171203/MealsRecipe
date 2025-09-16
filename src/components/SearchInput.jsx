import React, { useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/mealSlice";
import { useLocation } from "react-router-dom";


function SearchInput() {
     const dispatch = useDispatch();
     const searchQueryRaw = useSelector((state) => state.meals.searchQueryRaw || "");
     const location = useLocation();
   
     useEffect(() => {
         const params = new URLSearchParams(location.search);
         const query = params.get("search") || "";
       
           dispatch(setSearchQuery(query));

       }, [location, dispatch]);
   
    return (
       
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQueryRaw}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}              
              className="border-3 p-2 my-3 w-full rounded-2xl font-semibold bg-white outline-none focus:shadow-lg focus:border-red-600 duration-200 max-w-4xl"
            />
           
            )
    
}

export default SearchInput

import config from "../config/config"
import {Client, Databases, ID, Query} from "appwrite";


export class Service {
    client = new Client();
    databases;
    

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    // Add new meal
    async createMeal ({ strMeal, strMealThumb, strInstructions, ingredients, measures, strYoutube, strArea, strCategory }) {
        try {
           return await this.databases.createDocument(
            config.appwriteDbId,
            config.appwriteCollectionId,
            ID.unique(),
            {
                strMeal,
                strMealThumb,
                strInstructions,
                ingredients,
                measures,
                strYoutube,
                strArea,
                strCategory
            }
                
           ) 
        } catch (error) {
            console.log("Appwrite :: Create Meal :: Error ", error);
            throw error;
        }
    }

    //update a meal
    async updateMeal(id, data){
        try {
            return await this.databases.updateDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                id,
                data
            )
        } catch (error) {
            console.log("Appwrite :: Update Meal :: Error ", error);
            throw error;
        }
    }

    //delete Meal
    async deleteMeal(id){
        try {
            await this.databases.deleteDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                id
            );
            return true
        } catch (error) {
            console.log("Appwrite :: Delete Meal :: Error ", error);
            throw error;           
        }
    }

    // get a meal
    async getMeal(id){
        try {
            return await this.databases.getDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log("Appwrite :: Get Meal :: Error ", error);
            throw error;
        }
    }

    // get all meals
    async getMeals({ limit = 100, offset = 0, search = "" } = {}) {
    try {
      let queries = [Query.limit(limit), Query.offset(offset)];
      if (search) queries.push(Query.search("strMeal", search));

      return await this.databases.listDocuments(
        config.appwriteDbId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite :: Get Meals :: Error ", error);
      return { documents: [] };
    }
  }
}

const service = new Service()
export default service;
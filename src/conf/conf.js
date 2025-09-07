 const conf ={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDbId : String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteApiKey : String(import.meta.env.VITE_APPWRITE_API_KEY),
}

export default conf;
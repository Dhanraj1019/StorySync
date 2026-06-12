const conf={
    APPWRITE_URL:String(import.meta.env.VITE_APP_APPWRITE_URL),
    PROJECT_ID:String(import.meta.env.VITE_APP_PROJECT_ID),
    DATABASE_ID:String(import.meta.env.VITE_APP_DATABASE_ID),
    BUCKET_ID:String(import.meta.env.VITE_APP_BUCKET_ID),
    COLLECTION_ID:String(import.meta.env.VITE_APP_COLLECTION_ID)
}
 
export default conf;
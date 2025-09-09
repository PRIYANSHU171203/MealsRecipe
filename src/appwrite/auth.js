import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";



export class AuthService {
    client = new Client();
    account ;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

        async createAccount({email, password, username}){
            try {
                const userAccount = await this.account.create(ID.unique(), email, password, username);
                if(userAccount) return this.login({email, password});
                else return userAccount;

            } catch (error) {
                console.log("Appwrite :: Create Account :: Error ", error);
                throw error;
            }
        }

        // inside AuthService

        // Send verification email
        async sendVerificationEmail() {
            try {
                const redirectUrl =
                import.meta.env.MODE === "development"
                    ? "http://localhost:3000/verify"
                    : "https://meals-recipe-devils-projects-a9995fee.vercel.app/verify";

    return await this.account.createVerification(redirectUrl);
            } catch (error) {
                console.log("Appwrite :: Send Verification Email :: Error", error);
                throw error;
            }
        }

        // Complete verification when user clicks email link
        async confirmVerification(userId, secret) {
            try {
                const response = await this.account.updateVerification(userId, secret);
                return response;
            } catch (error) {
                console.log("Appwrite :: Complete Verification :: Error", error);
                throw error;
            }
        }


        async login({email, password}){
            try {
               const session = await this.account.createEmailPasswordSession(email, password);
                return session;

            } catch (error) {
                console.log("Appwrite :: Login :: Error ", error);
                throw error;
                
            }
        }
        async getCurrentUser(){
            try {
                return await this.account.get();
            } catch (e) {
                  console.log(e);
                  
               return null;
                
            }
        }

        async logout(){
            try {
                await this.account.deleteSession("current");
            } catch (error) {
                console.log("Appwrite :: Logout :: Error ", error);
                throw error;
            }
        }


        //update password service
        //update usename


    
} 

const authService = new AuthService();
export default authService;
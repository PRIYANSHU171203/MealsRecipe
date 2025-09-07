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
            }
        }

        async login({email, password}){
            try {
               return await this.account.createEmailPasswordSession(email, password);    
            } catch (error) {
                console.log("Appwrite :: Login :: Error ", error);
                
            }
        }
        async getCurrentUser(){
            try {
                return await this.account.get();
            } catch (error) {
                console.log("Appwrite :: Get Current User :: Error ", error);
                
            }
        }

        async logout(){
            try {
                await this.account.deleteSession("current");
            } catch (error) {
                console.log("Appwrite :: Logout :: Error ", error);
                
            }
        }


        //update password service
        //update usename


    
} 

const authService = new AuthService();
export default authService;
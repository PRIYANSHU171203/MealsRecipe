import config from "../config/config";
import { Client, Account, ID } from "appwrite";
import { normalizeUser } from "../utils/user";


export class AuthService {
    client = new Client();
    account ;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        
        this.account = new Account(this.client);
    }

        async createAccount({email, password, name}){
            try {
                const userAccount = await this.account.create(ID.unique(), email, password, name);
                return normalizeUser(userAccount);

                } catch (error) {
                    console.log("Appwrite :: Create Account :: Error ", error);
                    throw error;
                }
            }
        async login({email, password}){
            try {
                  await this.account.createEmailPasswordSession(email, password);
                  const user = await this.account.get();
                  console.log(user);
                  return normalizeUser(user);

            } catch (error) {
                console.log("Appwrite :: Login :: Error ", error);
                throw error;
                
            }
        }


        async logout(){
            try {
                    await this.account.deleteSession("current");
                    
                } catch (error) {
                    if (error.code === 401) {
                    console.log("No active session, already logged out.");
                    return; // just exit quietly
                    }
                    console.log("Appwrite :: Logout :: Error ", error);
                    throw error;
                }
        }

        async getCurrentUser(){
            try {
                 const user = await this.account.get();
                 console.log(user);
                 return normalizeUser(user);
            } catch (e) {
                  console.log(e);
                  return null;       
            }
        }

        async sendVerificationEmail() {
             try {            
                     const devOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";          
                     const redirectUrl =
                        import.meta.env.MODE === "development"
                            ? `${devOrigin}/verify`
                            : "https://meals-recipe-devils-projects-a9995fee.vercel.app/verify";

                        return await this.account.createVerification(redirectUrl);
                    } catch (error) {
                        console.log("Appwrite :: Send Verification Email :: Error", error);
                        throw error;
                    }
                }

        async confirmVerification(userId, secret) {
                try {
                        const response = await this.account.updateVerification(userId, secret);
                        return response;
                } catch (error) {
                    console.log("Appwrite :: Complete Verification :: Error", error);
                    throw error;
                }
            }

        async sentRecoveryEmail(email){
            try {
                
                const redirectUrl =
                import.meta.env.MODE === "development"
                            ? "http://localhost:3000/recovery"
                            : "https://meals-recipe-devils-projects-a9995fee.vercel.app/recovery";
                return await this.account.createRecovery(email, redirectUrl);
                
            } catch (error) {
                console.log("Appwrite :: Sent Recovery Email :: Error ", error);
                throw error;
            }
            
        }

        async completeRecovery(userId, secret, newPassword) {
            try {
                return await this.account.updateRecovery(userId, secret, newPassword);
            } catch (error) {
                console.log("Appwrite :: Complete Recovery :: Error ", error);
                throw error;
            }
        }


        //update password service
        async updatePass(newPassword, oldPassword) {
            try {
                 if (oldPassword) {
                    return await this.account.updatePassword(newPassword, oldPassword);
                    } else {
                    return await this.account.updatePassword(newPassword);
                    }
            } catch (error) {
                console.log("Appwrite :: Update Password :: Error ", error);
                throw error;
            }
        }


    
} 

const authService = new AuthService();
export default authService;
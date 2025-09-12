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

        async createAccount({email, password, name}){
            try {
                const userAccount = await this.account.create(ID.unique(), email, password, name);
                return userAccount;

                } catch (error) {
                    console.log("Appwrite :: Create Account :: Error ", error);
                    throw error;
                }
            }

        async sendVerificationEmail(email, password) {
             try {
                        // make sure session exists
                        await this.account.createEmailPasswordSession(email, password);

                        const redirectUrl =
                        import.meta.env.MODE === "development"
                            ? "http://localhost:3000/verify-complete"
                            : "https://meals-recipe-devils-projects-a9995fee.vercel.app/verify-complete";

                        return await this.account.createVerification(redirectUrl);
                    } catch (error) {
                        console.log("Appwrite :: Send Verification Email :: Error", error);
                        throw error;
                    }
                }

                // Complete verification when user clicks the email link
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
                    if (error.code === 401) {
                    console.log("No active session, already logged out.");
                    return; // just exit quietly
                    }
                    console.log("Appwrite :: Logout :: Error ", error);
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
            }
            
        }

        async completeRecovery(userId, secret, newPassword) {
            try {
                return await this.account.updateRecovery(userId, secret, newPassword);
            } catch (error) {
                console.log("Appwrite :: Complete Recovery :: Error ", error);
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
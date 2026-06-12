import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'
class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setProject(conf.PROJECT_ID).setEndpoint(conf.APPWRITE_URL);
        this.account=new Account(this.client);
    }

    async createAccount({id,email,name,password}){
        try{
            const user=await this.account.create({
            userId:ID.unique(),
            email,
            name,
            password
            })
            login({email,password});
            // return user;
        }catch(e){
            console.log("error during signup = ",e);
            return false;
        }
    }

    async login({email,password}){
        try{
            const result=await this.account.createEmailPasswordSession({
                email,password
            })
            return result;
        }catch(e){
            return false;
        }
    }

    async authStatus(){
        try{
            const result=await this.account.get();
            return result;
        }catch(e){
            return false;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
            return true;
        }catch(e){
            return false;
        }
    }

}

const authService = new AuthService();

export default authService;
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAcount({ email, password, name }) {
        const userAcount = await account.create(ID.unique(), email, password, name);

        try {
            if (userAcount) {
                return this.login({ email, password })
            }
        }
        catch (error) {
            return userAcount
        }
    }
    // login 
    async login({ email, password }) {
        try {
            return this.account.createEmailPasswordSession(email, password)
        }
        catch (error) {
            throw error;
        }
    }
    // getCurrentAcount
    async getCurrentAccount() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    // logout
    async logout() {
        try {
            await account.deleteSession();
        }
        catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

}

const authService = new AuthService();
export default authService;
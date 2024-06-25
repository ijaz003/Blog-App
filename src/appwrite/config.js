import conf from "../conf/conf";
import { ID, Account, Query, Databases, Client } from "appwrite";

export class Service {
    client = new Client();
    database;
    bucket
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Account(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async updatePost({ title, slug, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }
        catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            return false;
        }
    }

    async getComputedStyle(slug) {
        try {
            return this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }
        catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            return false;
        }
    }
    // upload file
    async uploadFile(file) {
        try {
            return await this.bucket.uploadFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            return false;
        }
    }

    // delete file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            return false;
        }
    }

    // preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;
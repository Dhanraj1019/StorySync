import { Client,Storage, Query , ID, TablesDB, Permission, Role } from "appwrite";
import conf from "../conf/conf";

class ManipulateDB{
    client=new Client();
    tablesDB;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.PROJECT_ID);
        this.tablesDB=new TablesDB(this.client);
        this.bucket=new Storage(this.client)
    }

    async createBlog({slug,content,featuredImage,status,title,userId}){
        try{
            const result = await this.tablesDB.createRow({
                databaseId:conf.DATABASE_ID,
                tableId:conf.COLLECTION_ID,
                rowId:slug,
                data:{
                    userid:userId,
                    content,
                    featuredImage,
                    status,
                    slug,
                    title
                }
            })
            return result;
        }catch(e){
            return false;
        }
    }

    async updateBlog(slug,{content,title,featuredImage,status}){
        try{
            return await this.tablesDB.updateRow(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,content,featuredImage,status
                }
            )
        }catch(e){
        }
    }

    async deleteBlog(slug){
        try{
            return await this.tablesDB.deleteRow(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug
            )
        } catch(e){
        }
    }

    async getBlog(slug){
        try{
            return await this.tablesDB.getRow({
                databaseId:conf.DATABASE_ID,
                tableId:conf.COLLECTION_ID,
                rowId:slug
            })
        }catch(e){
        }
    }

    async getAllBlogs(queries=[Query.equal('status','active')]){
        
        try{
            return await this.tablesDB.listRows({
                databaseId:conf.DATABASE_ID,
                tableId:conf.COLLECTION_ID,
                queries
            })
        }catch(e){
        }
    }

    async uploadFile(file){
        try{
            const result = await this.bucket.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                file,
                [
                    Permission.read(Role.any())
                ]
            )
            return result;
        }catch(e){
        }
    }

    async deleteFile(fileid){
        try{
            return await this.bucket.deleteFile(
                conf.BUCKET_ID,
                fileid
            )
        }catch(e){
        }
    }

    getFileView(fileid){
        try{
            const result = this.bucket.getFileView({
                bucketId: conf.BUCKET_ID,
                fileId: fileid
            });
            const fnf=result+"&mode=admin";
            return fnf;
        }catch(e){
        }
    }
}

const manipulateDB=new ManipulateDB();

export default manipulateDB;
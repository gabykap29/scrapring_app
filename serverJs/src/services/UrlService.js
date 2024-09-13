import { connectDb,writeDb } from "../db/db.js";

class UrlService{
    constructor(){
        this.db = connectDb();
    }
    async getAll(){
        const url = this.db;        
        return url.urls;
    }
    async addUrl(url){
        const db = this.db;
        db.urls.push(url);
        writeDb(db);
        return true;
    }

}
export default UrlService;
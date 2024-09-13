import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from '../config/config.js';
import { connectDb } from '../db/db.js';
import routerUrls from '../routes/url.routes.js';
import routerScraping from '../routes/scraping.routes.js';


class Server{
    constructor(){
        this.app = express();
        this.port = PORT || 4000;
        this.dbConnect();
        this.middlewares();
        this.routes()
    }
    async dbConnect(){
        await connectDb();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("combined"));
    }
    routes(){
        this.app.use('/api/',routerUrls);
        this.app.use('/api/',routerScraping);
    }
    listen(){
        this.app.listen(this.port,()=> {
            console.log("Servidor funcionando en el puerto " + this.port);            
        })
    }
}

export default Server;
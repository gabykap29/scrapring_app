import { config } from "dotenv";
config({path: '.env'})

export const PORT = process.env.PORT;
export const serverScraping = process.env.serverScraping;
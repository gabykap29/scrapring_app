import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { log } from 'console';

//Obtener la ruta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Ruta del archivo
const path = join(__dirname, '../','db.json');

//Si el json no existe, lo crea

export const connectDb = () => {
    if(!existsSync(path)){
        writeFileSync(path, JSON.stringify({urls:[]},null,2))
        log('JSON creado en ' + path);
    }
    log("EL json ya existe!, se encuentra en " + path);
    const data = readFileSync(path, 'utf8');
    return JSON.parse(data);
};

export const writeDb = (data) => {
    writeFileSync(path,JSON.stringify(data,null),'utf8')
};


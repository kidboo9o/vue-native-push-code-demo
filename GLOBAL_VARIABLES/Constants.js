import {FileSystem} from 'expo';
const database = "db.db";
export default{
    DATABASE: "db.db",
    DB_PATH: FileSystem.documentDirectory+"SQLite/"+database,
    ROOT_PATH: FileSystem.documentDirectory,
    CACHE_PATH: FileSystem.cacheDirectory,
}
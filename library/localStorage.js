import {FileSystem} from 'expo';
import Constants from "../GLOBAL_VARIABLES/Constants";
const cachePath = Constants.CACHE_PATH;
const rootPath = Constants.ROOT_PATH;
const dbPath = Constants.DB_PATH;
export default{
    checkFileOrDirectoryExists: function (name, type = "root") {
        if (type === "cache") {
            return FileSystem.getInfoAsync(cachePath + "/" + name);
        } else if (type === "root") {
            return FileSystem.getInfoAsync(rootPath + "/" + name);
        }

    },
    readFile: function (name, typeFile = "root", typeEncode = "utf8", position = 0, length = 0) {
        let options = {};
        let path = (typeFile === "cache") ? cachePath : (typeFile === "database") ? dbPath : rootPath;
        console.log("in ra path : "+path);
        if (typeEncode === "utf8") {
            return FileSystem.readAsStringAsync(path + "/" + name);
        } else if (typeEncode === "base64") {
            options["encoding"] = FileSystem.EncodingTypes.Base64;
            options["length"] = length;
            options["position"] = position;
            return FileSystem.readAsStringAsync(path + "/" + name, options)
        }
    },
    writeFile: function (name, contents, type = "utf8", typeFile="root") {
        let options = {};
        let path = (typeFile === "cache") ? cachePath : (typeFile === "database") ? dbPath : rootPath;
        if (typeof contents === "object") {
            if (Array.isArray(contents)) {
                contents = contents.join();
            } else {
                contents = JSON.stringify(contents);
            }
        }
        if (type === "utf8") {
            FileSystem.writeAsStringAsync(rootPath + "/" + name, contents);
        } else if (type === "base64") {
            options["encoding"] = FileSystem.EncodingTypes.Base64;
            FileSystem.writeAsStringAsync(rootPath + "/" + name, contents, options);
        }

    },
    removeFile: function (name, typeFile="root") {
        let path = (typeFile === "cache") ? cachePath : (typeFile === "database") ? dbPath : rootPath;
        return FileSystem.deleteAsync(path + "/" + name);
    },
    createDirectory: function (name, type = "cache", options) {
        if (type === "cache") {
            FileSystem.makeDirectoryAsync(cachePath + "/" + name, options);
        } else if (type === "root") {
            FileSystem.makeDirectoryAsync(rootPath + "/" + name, options);
        }

    },
    saveFileImage: function (urlDownload, name, type = "cache") {
        if (type === "cache") {
            FileSystem.downloadAsync(urlDownload, cachePath + "/" + name)
                .then(({uri}) => {
                    console.log('Finished downloading to ', uri);
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (type === "root") {
            FileSystem.downloadAsync(urlDownload, rootPath + "/" + name)
                .then(({uri}) => {
                    console.log('Finished downloading to ', uri);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    getPathFileImage: function (name, type = "cache") {
        let result = "";
        if (type === "cache") {
            result = cachePath + "/" + name;
        } else if (type === "root") {
            result = rootPath + "/" + name;
        }
        return result;
    },
}
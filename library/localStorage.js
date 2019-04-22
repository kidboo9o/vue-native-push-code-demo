import {FileSystem} from 'expo';
const rootPath = FileSystem.documentDirectory;
export default{
    checkFileOrDirectoryExists: function (name) {
        return FileSystem.getInfoAsync(rootPath + "/" + name);
    },
    readFile: function (name, type = "utf8", position = 0, length = 0) {
        let options = {};
        if (type === "utf8") {
            return FileSystem.readAsStringAsync(rootPath + "/" + name);
        } else if (type === "base64") {
            options["encoding"] = FileSystem.EncodingTypes.Base64;
            options["length"] = length;
            options["position"] = position;
            return FileSystem.readAsStringAsync(rootPath + "/" + name, options)
        }
    },
    writeFile: function (name, contents, type = "utf8") {
        let options = {};
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

    }
}
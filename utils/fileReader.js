const fs = require("fs");

function readProfileData(callback) {

fs.readFile("./data/profile.json","utf8",(err,data)=>{
    if(err){
        return callback(err,null);
    }
    try{
        const profile = JSON.parse(data);
        callback(null,profile);
    }
    catch(parseError){
        callback(parseError,null);
    }
});

}
module.exports = readProfileData;
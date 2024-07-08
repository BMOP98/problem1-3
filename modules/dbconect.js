const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://maximo98:BMOPpineda1@cluster0.gqrlqzi.mongodb.net/";
const client = new MongoClient(uri);
let dbInstance = null;
async function connectToDatabase(){
    try {
        if(dbInstance) return dbInstance;
        await client.connect();
        console.log("Conect to MongoDB Atlas");
        dbInstance = client.db("db_prodist");
        return dbInstance;
    } catch (error) {
        console.log("Error connecting to MongoDB Atlas: ", err);
        throw err;
    }
}
module.exports = {connectToDatabase};
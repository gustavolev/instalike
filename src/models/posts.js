import connectDatabase from "../config/database.js";

const dbConnection = await connectDatabase(process.env.STRING_CONEXAO);

const models = {
    getPosts: async function () {
        const db = dbConnection.db("instalike");
        const collection = db.collection("posts");

        return collection.find().toArray();
    }
}

export default models;
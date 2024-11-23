import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectDatabase from "../config/database.js";

const dbConnection = await connectDatabase(process.env.STRING_CONEXAO);

const models = {
    getPosts: async function () {
        const db = dbConnection.db("instalike");
        const collection = db.collection("posts");

        return collection.find().toArray();
    },

    newPost: async function (post) {
        const db = dbConnection.db("instalike");
        const collection = db.collection("posts");

        return collection.insertOne(post);
    },

    updatePost: async function (id, post) {
        const db = dbConnection.db("instalike");
        const collection = db.collection("posts");

        const objectId = ObjectId.createFromHexString(id);
        return collection.updateOne({_id: new ObjectId(objectId)}, {$set: post});
    }
}

export default models;

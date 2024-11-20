import { MongoClient } from "mongodb";

export default async function connectDatabase(strConnection) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(strConnection);
        console.log("Conectando ao cluster do banco de dados...");
        await mongoClient.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!");

        return mongoClient;
    } catch (error) {
        console.error("Falha ao conectar ao banco de dados!", error);
        process.exit();
    }
}

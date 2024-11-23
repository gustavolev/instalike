import fs from "fs";
import models from "../models/posts.js";
import services from "../services/gemini.js";

const controllers = {
    listPosts: async function (req, res) {
        const posts = await models.getPosts();
        res.status(200).json(posts);
    },

    newPost: async function (req, res) {
        const post = req.body;
        try {
            const donePost = await models.newPost(post);
            res.status(200).json(donePost);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({"Erro": "Falha na requisição"});
        }
    },

    uploadImage: async function (req, res) {
        const post = {
            descricao: "",
            imgUrl: req.file.originalname,
            alt: ""
        };

        try {
            const donePost = await models.newPost(post);
            
            const newImagePath = `uploads/${donePost.insertedId}.png`;
            fs.renameSync(req.file.path, newImagePath);

            res.status(200).json(donePost);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({"Erro": "Falha na requisição"});
        }
    },

    updateImage: async function (req, res) {
        const id = req.params.id;
        const urlImage = `http://localhost:3000/${id}.png`;

        try {
            const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
            const imageDescription = await services.generateImageDescription(imageBuffer);
            const post = {
                imgUrl: urlImage,
                descricao: imageDescription,
                alt: req.body.alt
            };

            const donePost = await models.updatePost(id, post);
            res.status(200).json(donePost);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({"Erro": "Falha na requisição"});
        }
    }
}

export default controllers;

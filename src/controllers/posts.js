import models from "../models/posts.js";

const controllers = {
    listPosts: async function (req, res) {
        const posts = await models.getPosts();
        res.status(200).json(posts);
    }
}

export default controllers;
import express from "express";
import controllers from "../controllers/posts.js";

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", controllers.listPosts);
};

export default routes;
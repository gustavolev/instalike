import os from "os";
import express from "express";
import multer from "multer";
import cors from "cors";
import controllers from "../controllers/posts.js";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

let upload;

if (os.platform() === "win32") {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });

    upload = multer({dest: "./uploads"}, storage);
} else if (os.platform() === "linux") {
    upload = multer({dest: "./uploads"});
} else {
    console.error("Sistema operacional não identificado!!!");
    process.exit();
}

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOption));

    app.get("/posts", controllers.listPosts);
    app.post("/posts", controllers.newPost);
    app.post("/upload", upload.single("imagem"), controllers.uploadImage);
    app.put("/upload/:id", controllers.updateImage)
};

export default routes;

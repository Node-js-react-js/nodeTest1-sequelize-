const express = require('express');
const apiRouter = express.Router();
const controller = require("./app/controllers/tutorial.controller");
apiRouter.get('/tutorials', async (req, res, next) => {
    try {
        console.log('get datas');
        const tutorials = await controller.findAll();
        res.status(200).json({ tutorials: tutorials });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
apiRouter.post('/tutorials', async (req, res, next) => {
    try {
        const tutorials = await controller.createTutorial({
            title: req.body.title,
            description:req.body.description,
        });
        res.status(200).json({ tutorials: tutorials });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
apiRouter.post('/comments', async (req, res, next) => {
    try {
        const comments = await controller.createComment(req.body.tuto_id,{
            name: req.body.name,
            text:req.body.text,
        });
        res.status(200).json({ comments: comments });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
apiRouter.get('/tutorial/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const tutorial = await controller.findTutorialById(id);
        res.status(200).json({ tutorial: tutorial });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
apiRouter.get('/comment/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const comment = await controller.findCommentById(id);
        res.status(200).json({ comment: comment });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports = apiRouter;
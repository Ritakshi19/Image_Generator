const express = require('express');
const imageRouter = express.Router();
const { generateImage } = require("../controllers/imageControllers.js")
const { getImageHistory } = require("../controllers/imageControllers.js")
imageRouter.route('/')
    .post(generateImage)
imageRouter.route('/').get(getImageHistory)
module.exports = imageRouter;
const express = require('express');
const sideBarRouter = express.Router();
const {demoExam} = require("../controllers/demoExam")

sideBarRouter.get('/demoExam/:subject', demoExam);

module.exports = sideBarRouter;

const express = require('express');
const router = express.Router();

const authenticate = require('../auth')
const storeQuestion = require('./storeQuestion')


router.post( "/store-question" , authenticate , storeQuestion  )

module.exports = router;
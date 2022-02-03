"use strict"

const express = require('express');
const router = express.Router();
const validateCarId = require('../middleware/validateCarId')
const {cars} = require('../data')

router.use('/:carId', validateCarId)

module.exports = router
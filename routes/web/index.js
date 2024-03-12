const express = require('express')
const home_router = require('./home')

const router = express.Router()

//child routers
router.use('/', home_router)
module.exports = router

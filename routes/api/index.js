const express = require('express')
const booking_router = require('./booking')

const router = express.Router()

// registering child routers
router.use('/booking', booking_router)
module.exports = router


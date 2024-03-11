const express = require('express');
const { validationResult } = require('express-validator');
const { addBookingValidation } = require('../../../validators/booking');

const router = express.Router();
const booking_controller = require('../../../controllers/api/booking');

// Define API routes
router.get('/', (req, res)=>{
    booking_controller.getAll(req, res);
});

router.post('/', addBookingValidation(), (req, res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    booking_controller.create(req, res)
})

module.exports = router;

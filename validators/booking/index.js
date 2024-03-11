const { body, param } = require('express-validator');
const booking_service = require('../../services/booking')

const addBookingValidation = () => {
  return [
    body('bookingName')
      .notEmpty().withMessage('Booking name must not be empty')
      .isLength({ min: 8, max: 255 }).withMessage('Booking name must be between 8 and 255 characters long'),
    body('bookingDateTime')
      .notEmpty().withMessage('Booking date time must not be empty')
      .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/, 'g')
        .withMessage('Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'),
    body('hotel')
      .notEmpty().withMessage('Hotel must not be empty'),
    body('contactPhone')
      .notEmpty().withMessage('Contact phone must not be empty')
      .matches(/^\+998\d{9}$/).withMessage('Invalid phone number format, it must be +998xxxxxxxxx'),
    body('room')
      .notEmpty().withMessage('Room must not be empty'),      
  ];
};

const deleteBookingValidation = () => {
  return [
    param('id').custom(async (id) => {
      const exists = await booking_service.getById(id);
      if (!exists) {
        throw new Error('Booking not found');
      }
    })
  ];
};

module.exports = {
    addBookingValidation,
    deleteBookingValidation
};
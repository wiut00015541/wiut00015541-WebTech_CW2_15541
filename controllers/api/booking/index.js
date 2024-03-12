// specific service class
const booking_service = require('../../../services/booking')

// methods
const booking_controller = {
    getAll(req, res) {
        res.json(booking_service.getAll())
    },
    create(req, res) {
        res.status(201).json(
            booking_service.create(req, res)
        )
    },
    update(req, res) {
        const booking = booking_service.update(req.params.id, req.body)
        
        if (booking) {
            res.json(booking)
        } else {
            res.status(404).send('Booking not found')
        }
    },
    delete(req, res) {
        const booking = booking_service.getById(req.params.id)
        
        if (booking) {
            booking_service.delete(req.params.id)
            res.status(204).send('Booking deleted successfully')
        } else {
            res.status(404).send('Booking not found')
        }
    }
}

module.exports = booking_controller

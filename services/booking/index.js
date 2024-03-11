const fs = require('fs')

// access global mock db file
const bookings = require(global.mock_db)

// write service method implementations
const booking_service = {
    getAll() {
        return bookings
    },
    getById(id) {
        return bookings.find(t => t.id == id)
    },    
    create(req, res) {
        let new_id = genRandId(4)
                
        const booking = req.body

        const new_booking = {
            id: new_id,
            booking: booking
        }

        bookings.push(new_booking)
        
        writeToFile(bookings)
        
        return new_booking
    },
    update(id, updateData){
        const bookingIndex = bookings.findIndex(t => t.id == id)

        if (bookingIndex === -1) {
            return null
        }

        bookings[bookingIndex].booking = { ...bookings[bookingIndex].booking, ...updateData }

        writeToFile(bookings)

        return bookings[bookingIndex]
    },
    delete(id) {
        const index = bookings.findIndex(u => u.id == id)
        bookings.splice(index, 1)    
        writeToFile(bookings)
    }
}

// create function for overwriting the db file updated db content
let writeToFile = async (users) => {
    await 
        fs.writeFileSync(
            global.mock_db,
            JSON.stringify(
                users, null, 4
            ),
            'utf8'
        )
}

// generate random id inspired by uuid
let genRandId = (count) =>{
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = booking_service

"use strict"

const {cars} = require('../data')
const validateCarId = (req, res, next) => {const id = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === id)
    if (index < 0) {
        res.status(404).send({
            errors: [
                {
                    status: '404',
                    title: 'Resource does not exist',
                    description: `We could not find a car with id: ${id}`
                }
            ]
        }
    )
    } else {
        req.carIndex = index
        next()
    }
}

module.exports = validateCarId
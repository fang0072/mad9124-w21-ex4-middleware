'use strict'
// load dependencies
const {cars} = require('./data/index.js')
const morgan = require('morgan')
const express = require('express')
const carsRouter = require('./data/index.js')

// create the express app
const app = express()

// configure express middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use('/api/cars', carsRouter)

/**
 * Format the response data object according to JSON:API v1.0
 * @param {string} type The resource collection name, e.g. 'cars'
 * @param {Object} resource An instance object from that collection
 * @returns
 */
function formatResponseData(type, resource) {
  const {id, ...attributes} = resource
  return {type, id, attributes}
}

// define routes
router.get('/', (req, res) => {
  res.json({data: cars.map(car => formatResponseData('cars', car))})
})

router.get('/:carId', (req, res) => {
  res.send({data: formatResponseData(cars[req.carIndex])
  })
})

router.put('/:carId', (req, res) => {
  const updatedCar = {
    ...req.body?.data?.attributes,
    id: parseInt(req.params.carId)
  }
  cars[req.carIndex] = updatedCar
  res.json({data: formatResponseData('cars', updatedCar)})
})

router.patch('/:carId', (req, res) => {
  const updatedCar = Object.assign(
    {},
    cars[req.carIndex],
    req.body?.data?.attributes,
    {id: parseInt(req.params.carId)}
  )
  cars[req.carIndex] = updatedCar
  res.json({data: formatResponseData('cars', updatedCar)})
})

router.delete('/:carId', (req, res) => {
  const deletedCar = cars.splice(req.carIndex, 1)[0]
  res.json({
    data: formatResponseData('cars', deletedCar),
    meta: {message: `Car with id: ${req.params.carId} successfully deleted.`}
  })
})

// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))

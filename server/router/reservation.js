const {createReservation, getReservations, getReservationById, deleteReservation, updateReservation} = require('../controller/reservation.controller')
const router = require('express').Router()


router.post('/', createReservation)
router.get('/', getReservations)
router.get('/:id', getReservationById)
router.delete('/:id', deleteReservation)
router.put('/:id', updateReservation)

module.exports = router

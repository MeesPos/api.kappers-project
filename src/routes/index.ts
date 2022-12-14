import express from 'express'
import controllers from '../controllers/index'
const router = express.Router()

router.get('/', controllers.getIndex)

router.get('/hairdressers', controllers.getAllHairdressers)
router.get('/hairdresser/:id', controllers.getHairdresser)
router.post('/hairdresser', controllers.postHairdresser)

router.post('/hairdresser/:id/availability', controllers.getAvailableDates)
router.post('/hairdresser/:id/availability/:date', controllers.getAvailabilityOnDate)

router.post('/login', controllers.login)
router.post('/forgot-password', controllers.sendMail)

router.post('/reset-password', controllers.resetPassword)

export = router

import express from 'express'
import controllers from '../controllers/index'
const router = express.Router()

router.get('/', controllers.getIndex)

router.get('/hairdressers', controllers.getAllHairdressers)
router.get('/hairdresser/:id', controllers.getHairdresser)
router.get('/hairdresser', controllers.postHairdresser)

export = router

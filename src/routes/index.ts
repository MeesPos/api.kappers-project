import express from 'express'
import controller from '../controllers/index'

const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     description: Get index
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/', controller.getIndex)

export = router

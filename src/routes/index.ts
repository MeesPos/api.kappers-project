import express from 'express'
import controller from '../controllers/index'

const router = express.Router()

/**
 * @openapi
 * /:
 *   get:
 *     description:  index
 *     responses: {hello: world}
 *       200:
 *         description: index.
 */
router.get('/', controller.getIndex)

export = router

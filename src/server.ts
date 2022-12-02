import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'

const openapiDoc = YAML.load('./openapi.yaml')

const router: Express = express()

/*Logging */
router.use(morgan('dev'))
/* Parse the request */
router.use(express.urlencoded({ extended: false }))
/* Takes care of JSON data */
router.use(express.json())
/* Use CORS for API routes */
router.use(cors())

/* Routes */
router.use('/', routes)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDoc))

/* Error handling */
router.use((req, res, next) => {
    const error = new Error('not found')
    return res.status(404).json({
        message: error.message,
    })
})

const httpServer = http.createServer(router)
const PORT: any = process.env.PORT ?? 8000
httpServer.listen(PORT, () =>
    console.log(`The server is running on http://localhost:${PORT}`)
)

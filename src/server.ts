import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const router: Express = express()

/*Logging */
router.use(morgan('dev'))
/* Parse the request */
router.use(express.urlencoded({ extended: false }))
/* Takes care of JSON data */
router.use(express.json())

// /* RULES OF OUR API */
// router.use((req, res, next) => {
// 	// set the CORS policy
// 	res.header("Access-Control-Allow-Origin", "*");
// 	// set the CORS headers
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"origin, X-Requested-With,Content-Type,Accept, Authorization"
// 	);
// 	// set the CORS method headers
// 	if (req.method === "OPTIONS") {
// 		res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
// 		return res.status(200).json({});
// 	}
// 	next();
// });

/* Routes */
router.use('/', routes)
const swaggerOptions = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'],
}
router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSDoc(swaggerOptions))
)

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

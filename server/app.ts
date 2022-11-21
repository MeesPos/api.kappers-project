import express, {Express, Request, Response} from 'express';
import path from 'path';
import indexRouter from './routes/index';
import hairdresserRouter from './routes/hairDresser';


const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/hairdresser', hairdresserRouter);


export default app;

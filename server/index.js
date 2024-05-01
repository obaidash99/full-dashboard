import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { Mongoose, mongo } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json()); // invoke express
app.use(helmet()); //
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // to allow make cross-origin sharing requests
app.use(morgan('common')); // to make api calls from another server
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server Port: ${PORT}`);
		});
	})
	.catch((error) => console.log(`${error} did not connect`));

import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors"; 
import helmet from "helmet";
import { itemsRouter } from "./router/items.route";

import config from 'config';

import cookieParser from 'cookie-parser';
import connectDB from './utils/connect';
import userRouter from './router/user.route';
import authRouter from './router/auth.route';
import http from 'http'



dotenv.config(); 

if (!process.env.PORT) {
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
// const port = config.get<number>('port');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.use(helmet());


app.use("/api/menu/items", itemsRouter);

app.use('/api/users', userRouter);

app.use('/api/auth', authRouter);

app.get(
	'/api/test',
	(req: Request, res: Response, next: NextFunction) => {
		res.status(200).json({
			status: 'success',
			message: 'API are working',
		});
	}
);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	const err = new Error(`Route ${req.originalUrl} not found`) as any;
	err.statusCode = 404;
	next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	err.status = err.status || 'error';
	err.statusCode = err.statusCode || 500;

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    connectDB();
});
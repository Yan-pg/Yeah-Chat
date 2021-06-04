import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import http from 'http';
import { Server } from 'socket.io';
import routes from './routes';
import '@shared/typeorm';
import AppError from '@shared/erros/AppError';
import upload from '@config/upload';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use((request: Request | any, response: Response, next: NextFunction) => {
  request.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.directory));

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

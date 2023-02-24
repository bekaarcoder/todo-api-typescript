import { taskRouter } from './src/tasks/tasks.router';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';

const app: Express = express();
dotenv.config();

// Parse request body
app.use(bodyParser.json());

// use CORS install type
app.use(cors());

// Create a Database connection
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: [Task],
  synchronize: true,
});

const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized');
    app.listen(port, () => console.log(`Server started at port ${port}`));
  })
  .catch((err) => {
    console.error('Error occured during Data Source initialization');
  });

app.use('/tasks', taskRouter);

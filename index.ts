import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';

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
  synchronize: true,
});

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express Server');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized');
    app.listen(port, () => console.log(`Server started at port ${port}`));
  })
  .catch((err) => {
    console.error('Error occured during Data Source initialization');
  });

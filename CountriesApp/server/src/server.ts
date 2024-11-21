//read environment variables
import * as dotenv from 'dotenv';
//we will be using exprerss
import express from 'express';
import cors from 'cors';
//use connectToDatabse function we created in database.ts file
import { connectToDatabase } from './database';
import { countriesRouter } from './countries.routes';
//load environment variables
dotenv.config();

//our connection string in .env file
const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error('ATLAS_URI environment variable Error');
  //exit application
  process.exit(1);
}

//if our connection string(ATLAS_URI) works
connectToDatabase(ATLAS_URI).then(() => {
  //Creates an Express application
  const app = express();
  app.use(cors());

  //instruct express server to use our routes
  app.use('/countries', countriesRouter);
  //start express server
  app.listen(5200, () => {
    console.log('Our server is running :)');
  });
});

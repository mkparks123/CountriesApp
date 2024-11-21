//here are all our API endpoints
import * as express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from './database';

//express router
export const countriesRouter = express.Router();
countriesRouter.use(express.json());

//get request
countriesRouter.get('/', async (_req, res) => {
  try {
    //finds ALL countries in db
    const countries = await collections?.countries?.find({}).toArray();
    res.status(200).send(countries);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : 'Error getting countries');
  }
});

//get specific country
countriesRouter.get('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const countries = await collections?.countries?.findOne(query);

    if (countries) {
      res.status(200).send(countries);
    } else {
      res.status(404).send(`Failed to find country: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find country: ID ${req?.params?.id}`);
  }
});

//save new country
countriesRouter.post('/', async (req, res) => {
  try {
    const countries = req.body;
    const result = await collections?.countries?.insertOne(countries);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new country: ID ${result.insertedId}.`);
    } else {
      res.status(500).send('Failed to create a new country.');
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : 'Creating country error');
  }
});

//update country(not yet implemented)
countriesRouter.put('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const countries = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.countries?.updateOne(query, {
      $set: countries,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated country: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find country: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update country: ID ${id}`);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Updating country error';
    console.error(message);
    res.status(400).send(message);
  }
});

//deleting country
countriesRouter.delete('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.countries?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed country: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove country ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find country: ID ${id}`);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Deleting country error';
    console.error(message);
    res.status(400).send(message);
  }
});

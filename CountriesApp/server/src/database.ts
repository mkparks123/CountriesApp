import * as mongodb from 'mongodb';

//countries interface
import { Countries } from './countries';

export const collections: {
  countries?: mongodb.Collection<Countries>;
} = {};

export async function connectToDatabase(uri: string) {
  //create mongo db client
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  //get DB
  const db = client.db('Countries');
  //schema validation makes sure all our documents follow the shape of our countries interface
  await applySchemaValidation(db);

  const countriesCollection = db.collection<Countries>('countries');
  collections.countries = countriesCollection;
}
//schema validation, takes in our db. We do this so we do not accidently store wrongly formnatted data
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: 'Object',
      required: ['name', 'numberOfVisits'],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: 'string',
          description: "'Name' is required",
        },
        numberOfVisits: {
          bsonType: 'number',
          description: 'A number is required',
        },
      },
    },
  };
}

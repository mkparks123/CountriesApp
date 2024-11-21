import * as mongodb from 'mongodb';

/*_id? is an optional field, Mongo DB will create it. So when we create a new country
we will not an an id (which is why its optional), but when we retrieve it from mondo, it will have an ID*/
export interface Countries {
  name: string;
  numberOfVisits: number;
  _id?: mongodb.ObjectId;
}

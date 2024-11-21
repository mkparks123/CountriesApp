import * as mongodb from 'mongodb';

//our countries will have a name and id field
/*_id? is an optional field, Mongo DB will create it. So when we create a new country
we will not an an id (which is why its optional), but when we retrieve it from mondo, it will have an ID*/
export interface Countries {
  name: string;
  _id?: mongodb.ObjectId;
}

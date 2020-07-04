# Stream Count

A service which checks how many video streams a given user is watching and prevents a user watching more than 3 video streams concurrently.

Built using Node.js (v12.16.2), Express.js (v4.17.1), MongoDB (v3.5.9) and Mongoose(v.5.9.21).

## Routes

```
GET api/v1/streams/users/:id
```

Returns data for a given user.

```
POST api/v1/streams/users/:id/start
```

Starts a stream for a given user. If successful returns a 200 status code and the new stream count for the user. If unsuccessful (there are already 3 active streams) returns a 403 status and error message "Maximum number of streams reached".

```
POST api/v1/streams/users/:id/stop
```

Stops a stream for a given user. If a stream is stopped and the new stream count is 0 the user will be removed from the database.

```
DELETE api/v1/streams/users/:id
```

Removes a user from tracking (for when all streams have stopped).

After installation there will be one user in the database to test with:

```
GET api/v1/streams/users/1
```

## Set Up

To check if Node.js is installed on your machine open a terminal window and enter:

```
node -v
```

If you do not already have Node.js installed please follow the instructions on [this guide](https://nodejs.org/en/download/package-manager/).

To check if npm is installed on your machine enter this command in you terminal window:

```
npm -v
```

If you do not have npm already installed please follow [this guide](https://www.npmjs.com/get-npm) to set it up.

If you do not have MongoDB already installed, please follow [this guide](https://docs.mongodb.com/manual/installation/)

## Installation

Once you have cloned the repo, navigate inside the folder and install all dependencies:

```
npm install
```

Enter the following command in your terminal window to connect to the database and keep it running:

```
mongod
```

To seed the database run:

```
npm run seed
```

Finally to run the server enter the following command in your terminal window:

```
npm start
```

This will run the server on port 3000. All endpoints can be found locally on http://localhost:3000 .

## Testing

To test the API navigate to the project directory and enter the following command

```
npm test
```

Testing was carried out using Mocha, Chai and Supertest.

## Scaling

As a starting point the app could be scaled using the Node.js cluster module to spawn child processes. Although one of the major drawbacks for this method is not being able to maintain state between the clusters, this would not be an issue as this app uses a databse for storage.

I am currently using single MongoDB database, but for scaling purposes could switch to using Mongo Atlas which will allow automatic horizontal scaling in response to demand.

The API could also be deployed to AWS with a load balancer to make use of auto-scaling, ensuring high demand can be reached but resource is not wasted.

A queue could also be implemented for starting/stopping stream requests to ensure different processes are not writing to the same data source.

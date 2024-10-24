// You have to create a middleware for rate limiting a users request based on their username passed in the header

const express = require('express');
const app = express();

// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second




const requestLimit = 2; // Number of allowed requests per second
const rateLimitWindow = 1000; // 1 second in milliseconds

let numberOfRequestsForUser = {};

// Middleware for rate limiting
app.use((req, res, next) => {
    const userId = req.headers['user-id'];

    if (!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    const now = Date.now();
    if (!numberOfRequestsForUser[userId]) {
         numberOfRequestsForUser[userId]= {count:1 ,starttime:now}}
         else{
          const userDate = numberOfRequestsForUser[userId];
          if(now - userDate.starttime > rateLimitWindow){
            numberOfRequestsForUser[userId] = {count :1, starttime:now}

          }else{
            userDate.count += 1;
            if(userDate.count > requestLimit){
              return res.status(404).json({
                error:"rate limit excessed"
              })
            }
          }
         }

    next();
});

// Route handlers
app.get('/user', (req, res) => {
    res.status(200).json({ name: 'john' ,
      USERID : 'john'
    });
});

app.post('/user', (req, res) => {
    res.status(200).json({ msg: 'Created dummy user' });
});



app.listen(3000,()=>{
  console.log("port is running")
})
const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;


const userController = require('./userController.js');
const cookieController = require('./cookieController.js');

//app.use(express.json()); //what is this used for?
app.use(express.urlencoded({extended: true})); // extended: true gets rid of a warning for body-parser
// without express.urlencoded(), req.body is just {}

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// if a user comes to localhost:3000 and has a sessionCookie, need to reroute them to their homepage, not the sign up page
// app.get('/', verifyUser, ..., redirect to /client)

// handle request to signup button
app.post('/', userController.createUser, cookieController.setSSIDCookie, (req, res) =>{
  res.status(200).redirect('./client'); 
})

// UPDATE - add middle ware to check that user is signed in before seeing this page
app.get('/client', (req,res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/userHomepage.html'));
})


// catch all route handler
app.use( (req, res) => res.status(404).send('We cannot find the page you are looking for.'))


// global error handler
app.use((err, req, res, next)=>{
  const defaultError = {
    log: 'Unknown middleware error.',
    status: 500,
    message: {err: 'There is a problem.'}
  };

  const errorObj = Object.assign({}, defaultError, err)
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

module.exports = app;
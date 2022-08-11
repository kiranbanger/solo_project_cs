const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = 3000;


const userController = require('./userController.js');
const cookieController = require('./cookieController.js');
const dataController = require('./dataController.js');

//app.use(express.json()); //what is this used for?
app.use(express.urlencoded({extended: true})); // extended: true gets rid of a warning for body-parser
// without express.urlencoded(), req.body is just {}
app.use(cookieParser());
app.use(express.static('client'));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// handle loading the log in page
app.get('/client/login', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/login.html'));
})

// handle loading the sign up page
app.get('/client/signup', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/signup.html'));
})

// handle a login post request
app.post('/client/login', userController.verifyUser, cookieController.setSSIDCookie,(req, res) => {
  res.status(200).redirect('../client');
})
// if a user comes to localhost:3000 and has a sessionCookie, need to reroute them to their homepage, not the sign up page
// app.get('/', verifyUser, ..., redirect to /client)

// handle post request to signup
app.post('/client/signup', userController.createUser, cookieController.setSSIDCookie, (req, res) => {
  res.status(200).redirect('../client'); 
})

// handle a fetch request to get user specific data, whch will then display on userHomepage
app.get('/getdata', cookieController.verifyToken, dataController.getPageData,(req, res) => {
  res.status(200).json(res.locals.eventData);
})

// UPDATE - add middle ware to check that user is signed in before seeing this page
app.get('/client', (req,res) => {
  console.log('in server - user: ', res.locals.userId, ' is authed? ', res.locals.authed)
  
  if(!res.locals.authed) {
    return res.status(403).send('You do not have access to this page.');
  } 
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
const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;


const userController = require('./userController.js');

//app.use(express.json()); //what is thisused for?
app.use(express.urlencoded({extended: true})); // extended: true gets rid of a warning for body-parser
// without express.urlencoded, req.body is just {}

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// handle request to signup button
app.post('/', userController.createUser,(req, res) =>{
  res.sendStatus(200);
})
// handle rquest to login button
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

module.exports = app;
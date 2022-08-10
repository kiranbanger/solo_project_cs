const db = require('../server/models/userModels.js'); // db.query(text, params, callback) to run a query

const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = (req, res, next) => {
  const { email } = req.body;
  const saltRounds = 2; //rounds used to generate the salt

  bcrypt.hash(req.body.password, saltRounds)
  .then( hash => {
    const q = `insert into users (email, hashcode) values ($1,$2) returning *`
    return db.query(q, [email, hash])
  })
  .then(dbRes => {
      if(dbRes.rowCount !== 1){
        return next({message: {err: 'Error creating account.'}, log: 'Error in userController.createUser - something went wrong with db query.' })
      }
      // save dbRes.rows[0], this data will be used for the JWT
      res.locals.userId = dbRes.rows[0].id;
      return next();
    })
  .catch(error => next({message: {err: 'Error in userController.createUser!'}, log: `Error details: ${error}`}))

}

userController.verifyUser = (req, res, next) => {
  console.log('request body: ', req.body);
  console.log('request params: ', req.params);
  console.log('cookies: ', req.cookies);
  return next();
}

module.exports = userController;
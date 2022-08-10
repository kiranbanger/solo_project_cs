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
  const { email, password } = req.body;
  // query db for username
  const q = `select id, hashcode from users where email = $1`
  db.query(q, [email])
  .then(dbRes => {
    if(dbRes.rowCount !== 1){
      return next({message: {err: 'Error signing in. Check email and password and try again, or sign up.'}, log: 'Error in userController.verifyUser - query returned unexpected results.'})
    }
    const hashToCheck = dbRes.rows[0].hashcode;
    res.locals.userId = dbRes.rows[0].id;
    return bcrypt.compare(password,hashToCheck)
  })
  .then( hashCheckResult => {
    console.log(hashCheckResult)
    if(!hashCheckResult){ // if false
      return next({message: {err: 'Error signing in. Check email and password and try again, or sign up.'}, log: 'Error in userController.verifyUser - incorrect data'})
    } // need to handle this better - redirect to login page?
    return next();
  })
  .catch( error => next({message: {err: 'Error in userController.verifyUser!'}, log: `Error details: ${error}`}) )
}

module.exports = userController;
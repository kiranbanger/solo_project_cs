const db = require('../server/models/userModels.js'); // db.query(text, params, callback) to run a query

const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = (req, res, next) => {
  const { email } = req.body;
  const saltRounds = 2; //rounds used to generate the salt

  console.log('in create user!!!',req.body)
  bcrypt.hash(req.body.password, saltRounds)
  .then( hash => {
    console.log(hash)

    const q = `insert into users (email, hashcode) values ($1,$2) returning *`
    db.query(q, [email, hash])
    .then(dbRes => {
      if(dbRes.rowCount !== 1){
        return next({message: {err: 'Error creating account.'}, log: 'Error in userController.createUser - something went wrong with db query.' })
      }
      // save dbRes.rows[0], this data will be used for the JWT
      res.locals.user_id = dbRes.rows[0].id
      console.log('in creat user, user data is: ', res.locals.user_id)
    })
  })
  .then( () =>{
    console.log('nexting in creatuser')
    return next()
  })
  .catch(error => next({message: {err: 'Error in userController.createUser!'}, log: error}))

}

module.exports = userController;
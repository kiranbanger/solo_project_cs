const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('in setssidcookie.');
  // const user_id = res.locals.userData.id;

  // console.log('userid: ', user_id);
  // jwt.sign({user_id},'secrettkey', {expiresIn: '1h'},(err, token) => {
  //   if(err){
  //     return next({message: {err: 'Error in userController.createUser.'}, log: `Problem creating token: ${err}`})
  //   }
  //   console.log('JWT token: ', token)
  //   return next()
  // })
  return next();
}

module.exports = cookieController;
const jwt = require('jsonwebtoken');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('in setssidcookie.');
  const { userId } = res.locals;

  console.log('userid: ', userId);
  jwt.sign({user_id: userId},'secrettkey', {expiresIn: '1h'},(err, token) => {
    if(err){
      return next({message: {err: 'Error in userController.createUser.'}, log: `Problem creating token: ${err}`})
    }
    console.log('JWT token: ', token)
    res.cookie('sessionCookie',token)
    return next()
  })
}

module.exports = cookieController;
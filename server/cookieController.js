const jwt = require('jsonwebtoken');

const cookieController = {};
const secret = 'secrettkey'

cookieController.setSSIDCookie = (req, res, next) => {
  //console.log('in setssidcookie.');
  const { userId } = res.locals;

  //console.log('userid: ', userId);
  jwt.sign({user_id: userId},secret, {expiresIn: '1h'},(err, token) => {
    if(err){
      return next({message: {err: 'Error in userController.createUser.'}, log: `Problem creating token: ${err}`})
    }
    //console.log('JWT token: ', token)
    res.cookie('sessionCookie',token)
    res.locals.authed = true;
    console.log('user: ', res.locals.userId, ' is authed? ', res.locals.authed)
    return next()
  })
}

cookieController.verifyToken = (req, res, next) => {
  const { sessionCookie } = req.cookies;
  jwt.verify(sessionCookie, secret, (err, decoded) => {
    if(err){
      return next({message: {err: 'Error in userController.verifyToken.'}, log: `Problem verifying token: ${err}`})
    }
    console.log(decoded)
    res.locals.userId = decoded.user_id;
    res.locals.authed = true;
    console.log('user: ', res.locals.userId, ' is authed? ', res.locals.authed)
    return next()
  })
}
module.exports = cookieController;
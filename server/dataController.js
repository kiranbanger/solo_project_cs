const db = require('./models/userModels.js');

const dataController = {};

dataController.getPageData = (req, res, next) => {
  console.log('in getPageData. user id is: ', res.locals.userId)
  return next()

  // look up events associated with this userId
}

module.exports = dataController;
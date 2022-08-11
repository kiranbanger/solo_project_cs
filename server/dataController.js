const db = require('./models/userModels.js');

const dataController = {};

dataController.getPageData = (req, res, next) => {
  console.log('in getPageData. user id is: ', res.locals.userId)

  const q = 
  `select
    e.start_date, 
    e.end_date,
    e.name as event_name,
    e.description as event_description,
    t.summary as task,
    t.description as task_description, 
    t.complete_by as task_complete_by
  from users_events ue
  join events e on e.id = ue.event_id
  left join tasks t on t.event_id = e.id
  where users_id = $1;`

  db.query(q, [res.locals.userId])
  .then( dbRes => {
    console.log(dbRes.rows)
    res.locals.eventData = dbRes.rows;
    return next()
  })
}

module.exports = dataController;
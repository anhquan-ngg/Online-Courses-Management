const coursesRouter = require('./courses');
const newsRouter = require('./news');
const homeRouter = require('./home');
const meRouter = require('./me');
// route index -> route each site -> each controllers route
function route(app) {
  app.use('/me', meRouter)
  app.use('/courses', coursesRouter);
  app.use('/news', newsRouter);
  app.use('/', homeRouter);
}

module.exports = route; // export the function for other files to use.

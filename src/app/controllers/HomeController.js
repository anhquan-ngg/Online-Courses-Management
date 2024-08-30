const Course = require('../models/Course');
const {multipleMongoosetoObject} = require('../../util/mongoose');

class HomeController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then(courses =>{
        // Convert Mongoose documents to plain objects before sending them to the view
        res.render('home', {
          courses: multipleMongoosetoObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new HomeController();

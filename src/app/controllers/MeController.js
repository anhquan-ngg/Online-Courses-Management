const Course = require('../models/Course');
const {multipleMongoosetoObject} = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
  storedCourses(req, res,next){
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty('_sort')){
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsWithDeleted({deleted: true})])
      .then(([courses, deletedCount]) => {
        res.render('me/stored-courses', {
          deletedCount,
          courses: multipleMongoosetoObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next){
    Course.findWithDeleted({deleted: true})
       .then(courses => res.render('me/trash-courses', {
                courses: multipleMongoosetoObject(courses),
            })
        ).catch(next);
  }
}


module.exports = new MeController();

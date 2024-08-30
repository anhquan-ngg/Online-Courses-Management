const Course = require('../models/Course');
const {mongoosetoObject} = require('../../util/mongoose');

class CourseController {
  // [GET] /courses/:slug
  show (req, res, next){
    Course.findOne({slug: req.params.slug})
      .then((course) => {
        res.render('courses/show', {course: mongoosetoObject(course), });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create (req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store (req, res, next) {
    // res.json(req.body);
    const formData = req.body;
    formData.image = "";
    Course.create(formData)
      .then(() => res.redirect('/'))
      .catch(next);
  }
   // [GET] /courses/create
  edit (req, res, next) {
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit', {
        course: mongoosetoObject(course),
      })).catch(next);
  }
  // [PUT] /courses/:id/
  update(req, res, next) {
    Course.updateOne({_id: req.params.id}, req.body)
     .then(() => res.redirect('/me/stored/courses'))
     .catch(next);
  }

  // [DELETE] /courses/:id/
  destroy(req, res, next) {
    Course.delete({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(next);
 }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({_id: req.params.id})
     .then(() => res.redirect('/me/stored/courses'))
     .catch(next);
  }

  
  // [DELETE] /courses/:id/delete
  forceDelete(req, res, next){
    Course.deleteOne({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(next);
  }

  // [POST] /courses/handle-forms-action
  handleFormActions(req, res, next){
    switch(req.body.action){
      case 'delete':
        Course.delete({_id: {$in: req.body.courseIds}})
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      default:
        res.json({message: 'Action is invalid'});
    }
  }

  // [POST] /courses/handle-trash-actions
  handleTrashActions(req, res, next){
    switch(req.body.action){
      case 'restore':
        Course.restore({_id: {$in: req.body.courseIds}})
         .then(() => res.redirect('/me/trash/courses'))
         .catch(next);
        break;

      case 'delete':
        Course.deleteMany({_id: {$in: req.body.courseIds}})
         .then(() => res.redirect('/me/trash/courses'))
         .catch(next);
        break;

      default:
        res.json({message: 'Action is invalid'});
    }
  }
}

 
 
// GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD 

module.exports = new CourseController();

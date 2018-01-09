const express = require('express');
var userPassword = require.main.require('./addon/fjTool/userPassword');
// const app = express();
const usersRouter = express.Router();
//var admin_option = require('../models/admin_option');
var Users = require('../../login/models/userModel');
var user_url='/manager_penel/users';


usersRouter.route('/').get(function (req, res) {
    Users.find(function (err, result){
      if(err){
        console.log(err);
      }
      else {
        // console.log(result);
        res.render('manager/users/users', {itms: result});
        
      }
    });
  });

usersRouter.route('/add').get((req, res)=>{
    res.render('manager/users/addUser');
});

usersRouter.route('/edit/:id').get(function (req, res) {
    var id = req.params.id;
    Users.findById(id, function (err, result_user){
      
          res.render('manager/users/editUser', {item: result_user});
        
      
    });
  });

usersRouter.route('/add/user').post(function (req, res) {
    //console.log(user_data);
    var users = new Users(req.body);
    users.password = userPassword.createHash(req.body.password);
    users.save()
      .then(posts => {
      res.redirect(user_url);
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });
usersRouter.route('/update/:id').post(function (req, res) {
    Users.findById(req.params.id, function(err, user) {
      if (!user)
        return next(new Error('Could not load Document'));
      else {
        // do your updates here
        

        user.displayName = req.body.displayName;
        user.role = req.body.role;
        if(req.body.password)user.password = userPassword.createHash(req.body.password);
        // console.log(posts);
        user.save().then(item => {
            res.redirect(user_url);
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });
usersRouter.route('/delete/:id').get(function (req, res) {
    Users.findByIdAndRemove({_id: req.params.id},
         function(err, item){
          if(err) res.json(err);
          else res.redirect(user_url);
      });
  });
module.exports = usersRouter;
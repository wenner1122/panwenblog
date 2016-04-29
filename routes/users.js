var express = require('express');
var models = require('../models');
var util = require('../util');
var auth = require('../middleware/auth');

var router = express.Router();

/* GET users listing. */
router.get('/reg', auth.checkNotLogin, function(req, res, next) {
  res.render('user/reg', { title: '注册' });
});

router.post('/reg', auth.checkNotLogin, function(req,res,next){
  var user = req.body;
  if(user.password != user.repassword){
  }else{
    req.body.password = util.md5(req.body.password);
    req.body.avatar = 'https://secure.gravatar.com/avatar/'+util.md5(req.body.email)+'?s=48';
    models.User.create(req.body,function(err,doc){
      console.log(doc);
      if(err){
        req.flash('error','用户注册失败！');
      }else{
        req.flash('success','用户注册成功！');
        res.redirect('/users/login');
      }
    });
  }
});

router.get('/login', auth.checkNotLogin, function(req, res, next) {
  res.render('user/login', { title: '登录' });
});
router.post('/login', auth.checkNotLogin, function(req,res,next){
  //var user = req.body;
  req.body.password = util.md5(req.body.password);
  models.User.findOne({username:req.body.username,password:req.body.password},function(err,doc){
    if(err){
      req.flash('error','用户登陆失败！');
      res.redirect('back');
    }else{
      if(doc){
        req.session.user = doc;
        req.flash('success','用户登陆成功！');
        res.redirect('/');
      }else{
        req.flash('error','用户登陆失败！');
        res.redirect('back');
      }
    }
  });
});


router.get('/logout', auth.checkLogin, function(req, res, next) {
  req.session.user = null;
  req.flash('success','用户退出成功！');
  res.redirect('/');
});

module.exports = router;

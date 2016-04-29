var express = require('express');
var markdown = require('markdown').markdown;
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Article.find({}).populate('user').exec(function(err,articles){
    console.log(articles);
    articles.forEach(function(article){
      article.content = markdown.toHTML(article.content);
    });
    res.render('index',{articles:articles})
  });
});


module.exports = router;

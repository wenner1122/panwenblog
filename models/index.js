var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var config = require('../config');
mongoose.connect(config.dbUrl);
exports.User =mongoose.model('user',new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  avatar:String
}));


exports.Article = mongoose.model('article',new mongoose.Schema({
  user:{type:ObjectId,ref:'user'},
  title:String,
  content:String,
  createAt:{type:Date,default:Date.now()}
}));
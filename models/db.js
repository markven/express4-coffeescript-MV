(function() {
  var Blog, Comment, Schema, mongoose;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  Blog = new Schema({
    Username: String,
    Article: String,
    CreateDate: Date
  });

  Comment = new Schema({
    Visitor: String,
    Comment: String,
    MessageID: Schema.Types.ObjectId,
    CreateDate: Date
  });

  mongoose.model("Blog", Blog);

  mongoose.model("Comment", Comment);

  mongoose.connect("mongodb://140.120.26.67/coffee_blog");

}).call(this);

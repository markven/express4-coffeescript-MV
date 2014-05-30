(function() {
  var Blog, mongoose;

  mongoose = require("mongoose");

  Blog = mongoose.model("Blog");

  exports.index = function(req, res) {
    res.locals.username = req.session.name;
    res.locals.authenticated = req.session.logined;
    return Blog.find(function(err, blogs, count) {
      return res.render("index", {
        title: "Blog System",
        blogs: blogs
      });
    });
  };

}).call(this);

mongoose = require("mongoose")
Blog = mongoose.model("Blog")
exports.index = (req, res) ->
  res.locals.username = req.session.name
  res.locals.authenticated = req.session.logined
  Blog.find (err, blogs, count) ->
    res.render "index", {
      title: "Blog System"
      blogs: blogs
  }

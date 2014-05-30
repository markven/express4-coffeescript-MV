(function() {
  var Blog, Comment, mongoose;

  mongoose = require("mongoose");

  Blog = mongoose.model("Blog");

  Comment = mongoose.model("Comment");

  module.exports = {
    register: function(req, res) {
      if (req.session.logined) {
        res.redirect("/");
      }
      return res.render("users/register");
    },
    signin: function(req, res) {
      if (req.session.logined) {
        res.redirect("/");
      }
      return res.render("users/signin");
    },
    signout: function(req, res) {
      req.session.logined = false;
      res.redirect("/");
      return res.end();
    },
    forget: function(req, res) {
      if (req.session.logined) {
        res.redirect("/");
      }
      return res.render("users/forget");
    },
    profile: function(req, res) {
      if ((!req.session.name) || (!req.session.logined)) {
        res.redirect("/");
      }
      res.locals.username = req.session.name;
      res.locals.authenticated = req.session.logined;
      return Blog.find({
        Username: req.session.name
      }, function(err, blogs, count) {
        return res.render("users/profile", {
          title: "Blog System",
          blogs: blogs
        });
      });
    },
    add_article: function(req, res) {
      if ((!req.session.name) || (!req.session.logined)) {
        res.redirect("/");
      }
      res.locals.username = req.session.name;
      res.locals.authenticated = req.session.logined;
      return res.render("users/add_article");
    },
    modify: function(req, res) {
      if ((!req.session.name) || (!req.session.logined)) {
        res.redirect("/");
      }
      res.locals.username = req.session.name;
      res.locals.authenticated = req.session.logined;
      res.locals.messageID = req.params.id;
      return Blog.find({
        _id: req.params.id
      }, function(err, blogs, count) {
        return res.render("users/modify", {
          blogs: blogs
        });
      });
    },
    message: function(req, res) {
      res.locals.username = req.session.name;
      res.locals.authenticated = req.session.logined;
      res.locals.messageID = req.params.id;
      return Blog.find({
        _id: req.params.id
      }, function(err, blogs, count) {
        return Comment.find({
          MessageID: req.params.id
        }, function(err, comments, count) {
          return res.render("users/message", {
            blogs: blogs,
            comments: comments
          });
        });
      });
    },
    del_article: function(req, res) {
      Blog.remove({
        _id: req.params.id
      }, function(err) {
        if (err) {
          return console.log("Fail to delete article.");
        } else {
          return console.log("Done");
        }
      });
      return res.redirect("/profile");
    },
    login: function(req, res) {
      if ((!req.body.user) || (!req.body.passwd)) {
        res.redirect("register");
      }
      req.session.name = req.body.user;
      req.session.passwd = req.body.passwd;
      req.session.logined = true;
      return res.redirect("/");
    },
    add: function(req, res) {
      if (!req.session.name) {
        res.redirect("/");
      }
      new Blog({
        Username: req.session.name,
        Article: req.body.Content,
        CreateDate: Date.now()
      }).save(function(err) {
        if (err) {
          console.log("Fail to save to DB.");
        }
        return console.log("Save to DB.");
      });
      return res.redirect("/");
    },
    update: function(req, res) {
      if (!req.params.id) {
        res.redirect("/");
      }
      Blog.update({
        _id: req.params.id
      }, {
        Article: req.body.Content
      }, function(err) {
        if (err) {
          return console.log("Fail to update article.");
        } else {
          return console.log("Done");
        }
      });
      return res.redirect("/profile");
    },
    comment: function(req, res) {
      if (!req.params.id) {
        res.redirect("/");
      }
      new Comment({
        Visitor: req.body.Visitor,
        Comment: req.body.Comment,
        MessageID: req.params.id,
        CreateDate: Date.now()
      }).save(function(err) {
        if (err) {
          console.log("Fail to save to DB.");
        }
        return console.log("Save to DB.");
      });
      return res.redirect("/message/" + req.params.id);
    }
  };

}).call(this);

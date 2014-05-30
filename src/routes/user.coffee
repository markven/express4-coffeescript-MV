mongoose = require("mongoose")
Blog = mongoose.model("Blog")
Comment = mongoose.model("Comment")
module.exports =

register:(req, res) ->
  if req.session.logined
    res.redirect "/"
  res.render "users/register"

signin:(req, res) ->
  if req.session.logined
    res.redirect "/"
  res.render "users/signin"

signout:(req, res) ->
  req.session.logined = false
  res.redirect "/"
  res.end()

forget:(req, res) ->
  if req.session.logined
    res.redirect "/"
  res.render "users/forget"


profile:(req, res) ->
  if (not req.session.name) or (not req.session.logined)
    res.redirect "/"
  res.locals.username = req.session.name
  res.locals.authenticated = req.session.logined
  Blog.find
    Username: req.session.name
  , (err, blogs, count) ->
    res.render "users/profile",
      title: "Blog System"
      blogs: blogs

add_article:(req, res) ->
  if (not req.session.name) or (not req.session.logined)
    res.redirect "/"
  res.locals.username = req.session.name
  res.locals.authenticated = req.session.logined
  res.render "users/add_article"


modify:(req, res) ->
  if (not req.session.name) or (not req.session.logined)
    res.redirect "/"
  res.locals.username = req.session.name
  res.locals.authenticated = req.session.logined
  res.locals.messageID = req.params.id
  Blog.find {
    _id: req.params.id
  }
  , (err, blogs, count) ->
    res.render "users/modify", {
      blogs: blogs
    }

message:(req, res) ->
  res.locals.username = req.session.name
  res.locals.authenticated = req.session.logined
  res.locals.messageID = req.params.id
  Blog.find {
    _id: req.params.id
  }
  , (err, blogs, count) ->
    Comment.find {
      MessageID: req.params.id
    }
    , (err, comments, count) ->
      res.render "users/message",
      {
        blogs: blogs
        comments: comments
      }
del_article:(req, res) ->
  Blog.remove {
    _id: req.params.id
  }
  , (err) ->
    if err
      console.log "Fail to delete article."
    else
      console.log "Done"

  res.redirect "/profile"

login:(req, res) ->
  if (not req.body.user) or (not req.body.passwd)
    res.redirect "register"
  req.session.name = req.body.user
  req.session.passwd = req.body.passwd
  req.session.logined = true
  res.redirect "/"

add:(req, res) ->
  unless req.session.name
    res.redirect "/"
  new Blog({
    Username: req.session.name
    Article: req.body.Content
    CreateDate: Date.now()
  }
  ).save (err) ->
    if err
      console.log "Fail to save to DB."
    console.log "Save to DB."
  res.redirect "/"

update:(req, res) ->
  unless req.params.id
    res.redirect "/"
  Blog.update {
      _id: req.params.id},
      {Article: req.body.Content}
  , (err) ->
    if err
      console.log "Fail to update article."
    else
      console.log "Done"
  
  res.redirect "/profile"


comment:(req, res) ->
  unless req.params.id
    res.redirect "/"

  new Comment({
    Visitor: req.body.Visitor
    Comment: req.body.Comment
    MessageID: req.params.id
    CreateDate: Date.now()
  }
  ).save (err) ->
    if err
      console.log "Fail to save to DB."
    console.log "Save to DB."


  res.redirect "/message/" + req.params.id


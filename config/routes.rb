Gazebo::Router.draw do
  get Regexp.new("^/$"), StaticPagesController, :index

  post Regexp.new("^/beats"), BeatsController, :create
  get Regexp.new("^/beats"), BeatsController, :index
  delete Regexp.new("^/beats/(?<id>\\d+)$"), BeatsController, :destroy

  get Regexp.new("/users/new"), UsersController, :new
  post Regexp.new("/users"), UsersController, :create

  get Regexp.new("/session/new"), SessionsController, :new
  post Regexp.new("/session"), SessionsController, :create
  delete Regexp.new("/session"), SessionsController, :destroy
end

Gazebo::Router.draw do
  get Regexp.new("^/$"), CatsController, :go
  get Regexp.new("^/cats/(?<id>\\d+)$"), CatsController, :show
  get Regexp.new("/cats"), CatsController, :index

  get Regexp.new("/humans"), HumansController, :index

  get Regexp.new("/users/new"), UsersController, :new
  post Regexp.new("/users"), UsersController, :create

  get Regexp.new("/session/new"), SessionsController, :new
  post Regexp.new("/session"), SessionsController, :create
  delete Regexp.new("/session"), SessionsController, :destroy
end

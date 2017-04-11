class CatsController < ApplicationController
  def go
    render_content("Hello from the controller", "text/html")
  end

  def index
    @cats = Cat.order(:name).limit(10)
    render :index
  end

  def show
    @cat = Cat.find(params['id'])
    render :show
  end
end

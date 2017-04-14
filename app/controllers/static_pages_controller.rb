class StaticPagesController < ApplicationController
  def index

    # if logged_in?
      render :index
    # else
    #   redirect_to("/session/new")
    # end
  end
end

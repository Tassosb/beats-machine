class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(params['user'])
    if @user.save
      redirect_to("/cats")
    else
      flash[:errors] = @user.errors
      render :new
    end
  end

  private
  def user_params
  end
end

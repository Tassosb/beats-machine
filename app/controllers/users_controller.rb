class UsersController < ApplicationController
  def new
    @hide_sign_up_link = true
    @user = User.new
    render :new
  end

  def create
    @user = User.new(params['user'])
    if @user.save
      redirect_to("/")
    else
      flash[:errors] = @user.errors
      render :new
    end
  end

  private
  def user_params
  end
end

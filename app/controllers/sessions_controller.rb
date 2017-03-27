class SessionsController < ApplicationController
  def new
    @hide_log_in_link = true
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params['user']['username'],
      params['user']['password']
    )

    if @user
      log_in!(@user)
      redirect_to("/cats")
    else
      flash[:errors] = ["Invalid Credentials"]
      @user = User.new(
        username: params['user']['username']
      )
      render :new
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to "/session/new"
  end

  def log_in!(user)
    session[:session_token] = user.reset_session_token!
  end
end

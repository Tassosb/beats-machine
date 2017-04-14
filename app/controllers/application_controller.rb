class ApplicationController < ActionCondor::Base

  def current_user
    @current_user ||= User.find_by(
      session_token: session[:session_token]
    )
  end

  def current_user_id
    current_user.nil? ? nil : current_user.id
  end

  def logged_in?
    !!current_user
  end

end

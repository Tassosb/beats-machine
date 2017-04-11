class ApplicationController < ActionCondor::Base

  def current_user
    @current_user ||= User.find_by(
      session_token: session[:session_token]
    )
  end

end

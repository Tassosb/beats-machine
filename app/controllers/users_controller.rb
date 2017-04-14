class UsersController < ApplicationController
  def new
    @hide_sign_up_link = true
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      redirect_to("/")
    else
      flash.now[:errors] = @user.errors.map do |k, v|
        "#{k.to_s.capitalize} #{v.join(" and ")}"
      end
      @hide_sign_up_link = true
      render :new
    end
  end

  private
  def user_params
    permitted = params['user']
    {
      username: (permitted['username'] === "" ? nil : permitted['username']),
      password: (permitted['password'] === "" ? nil : permitted['password'])
    }
  end
end

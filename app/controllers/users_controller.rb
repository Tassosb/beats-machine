class UsersController < ApplicationController
  def new
    @hide_sign_up_link = true
    @user = User.new
    render :new
  end

  def create
    @user = User.new(params['user'])
    if @user.save
      log_in!(@user)
      redirect_to("/")
    else
      flash[:errors] = @user.errors.map do |k, v|
        "#{k.to_s.capitalize} #{v.join(" and ")}"
      end
      @hide_sign_up_link = true
      render :new
    end
  end

  private
  def user_params
  end
end

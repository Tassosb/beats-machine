class BeatsController < ApplicationController
  def index
    render :index
  end

  def create
    beat = Beat.new(
      name: params['name'],
      sound: params['sound']
    )
    beat.author_id = current_user_id || 1

    if beat.save
      render_content(beat.attributes, "application/json")
    else
      render_content(beat.errors, "application/json")
    end
  end
end

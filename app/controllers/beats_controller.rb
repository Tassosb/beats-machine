class BeatsController < ApplicationController
  def index
    beats = Beat.all.inject({}) do |accum, beat|
      accum[beat.id] = {
        name: beat.name,
        sound: beat.sound,
        id: beat.id
      }
      accum
    end

    render_content(beats, "application/json")
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

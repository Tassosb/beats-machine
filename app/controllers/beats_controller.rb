class BeatsController < ApplicationController
  def index
    beats = logged_in? ? current_user.beats : []

    beats = beats.inject({}) do |accum, beat|
      accum[beat.id] = beat.to_json
      accum
    end

    render_content(beats, "application/json")
  end

  def create
    beat = Beat.new(beat_params)
    beat.author_id = current_user_id

    if beat.save
      render_content(beat.to_json, "application/json")
    else
      res.status = 422
      render_content(beat.errors, "application/json")
    end
  end

  def destroy
    beat = Beat.find(params['id'])
    beat.destroy if beat
    render_content(beat.to_json, "application/json")
  end

  private
  def beat_params
    {
      name: (params['name'] === "" ? nil : params['name']),
      sound: params['sound']
    }
  end
end

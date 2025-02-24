class CheckUpdatesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "check_updates"
  end
end

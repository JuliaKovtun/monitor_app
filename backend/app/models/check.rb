# frozen_string_literal: true

class Check < ApplicationRecord
  belongs_to :url_monitor

  after_commit :broadcast_status_update, on: [:create]

  private

  def broadcast_status_update
    ActionCable.server.broadcast(
      "check_updates",
      {
        monitor_id: url_monitor.id,
        status: url_monitor.status,
        last_checked_at: url_monitor.last_checked_at,
          check: {
            id:,
            status_code:,
            response_time:,
            checked_at:,
            success:,
            url_monitor_id:,
            error_message:
          }
      }
    )
  end
end

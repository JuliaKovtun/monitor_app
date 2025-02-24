# frozen_string_literal: true

class UrlMonitor < ApplicationRecord
  enum status: { up: 0, down: 1 }, _prefix: :status

  has_many :checks, dependent: :destroy
  belongs_to :user

  validates :url, :check_interval, :name, presence: true
  validates :check_interval, numericality: { greater_than_or_equal_to: 5 }

  def perform_check
    start_time = Time.current
    response = HTTParty.get(url)
    end_time = Time.current
    checks.create!(
      status_code: response.code,
      response_time: (end_time - start_time) * 1000,
      success: response.success?,
      checked_at: Time.current
    )
     update(
      status: response.success? ? 'up' : 'down',
      last_checked_at: Time.current
    )
  rescue StandardError => e
    checks.create!(
      success: false,
      checked_at: Time.current,
      error_message: e.message
    )
    update(status: 'down', last_checked_at: Time.current)
  end
end

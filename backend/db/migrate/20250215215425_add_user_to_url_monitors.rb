# frozen_string_literal: true

class AddUserToUrlMonitors < ActiveRecord::Migration[7.1]
  def change
    add_reference :url_monitors, :user, foreign_key: true
  end
end

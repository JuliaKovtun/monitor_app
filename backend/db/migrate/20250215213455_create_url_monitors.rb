# frozen_string_literal: true

class CreateUrlMonitors < ActiveRecord::Migration[7.1]
  def change
    create_table :url_monitors do |t|
      t.string   :url
      t.string   :name
      t.integer  :check_interval
      t.integer  :status
      t.datetime :last_checked_at

      t.timestamps
    end
  end
end

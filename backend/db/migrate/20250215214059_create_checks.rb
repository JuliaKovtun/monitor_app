# frozen_string_literal: true

class CreateChecks < ActiveRecord::Migration[7.1]
  def change
    create_table :checks do |t|
      t.integer    :status_code
      t.float      :response_time
      t.datetime   :checked_at
      t.boolean    :success
      t.references :url_monitor, foreign_key: true

      t.timestamps
    end
  end
end

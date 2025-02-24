class AddErrorMessageToCheck < ActiveRecord::Migration[7.1]
  def change
    add_column :checks, :error_message, :string
  end
end

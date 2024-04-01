class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.text :description, null: false
      t.integer :target_value, null: false
      t.date :target_date, null: false
      t.integer :tracking_interval, default: 0, null: false, limit: 2

      t.timestamps
    end
  end
end

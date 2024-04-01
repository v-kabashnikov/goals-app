class CreateStats < ActiveRecord::Migration[7.0]
  def change
    create_table :stats do |t|
      t.references :goal, null: false, foreign_key: true
      t.integer :value, null: false

      t.timestamps
    end
  end
end

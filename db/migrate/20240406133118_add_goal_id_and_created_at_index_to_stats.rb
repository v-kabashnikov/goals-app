class AddGoalIdAndCreatedAtIndexToStats < ActiveRecord::Migration[7.0]
  def change
    add_index :stats, %i[goal_id created_at]
  end
end

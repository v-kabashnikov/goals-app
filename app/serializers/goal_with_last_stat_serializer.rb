# frozen_string_literal: true

class GoalWithLastStatSerializer < ActiveModel::Serializer
  attributes :id, :description, :target_value, :target_date, :tracking_interval, :current_value, :last_tracked_at

  def current_value
    object.last_stat&.value || 0
  end

  def last_tracked_at
    object.last_stat&.created_at
  end
end

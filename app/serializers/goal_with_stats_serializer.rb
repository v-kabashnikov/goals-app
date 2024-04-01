# frozen_string_literal: true

class GoalWithStatsSerializer < ActiveModel::Serializer
  attributes :id, :description, :target_value, :target_date, :tracking_interval
  has_many :stats
end

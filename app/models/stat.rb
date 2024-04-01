# frozen_string_literal: true

class Stat < ApplicationRecord
  belongs_to :goal

  validates :value, presence: true, numericality: { only_integer: true, greater_than: 0 }

  default_scope { order(created_at: :asc) }
end

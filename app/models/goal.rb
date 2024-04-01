# frozen_string_literal: true

class Goal < ApplicationRecord
  has_many :stats, dependent: :destroy
  has_one :last_stat, -> { unscope(:order).order(created_at: :desc) }, class_name: 'Stat'
  enum tracking_interval: { daily: 0, hourly: 1, weekly: 2, monthly: 3 }

  validates :description, presence: true
  validates :target_value, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 2_147_483_647 }
  validates :target_date, presence: true
  validates :tracking_interval, presence: true
  validate :target_date_cannot_be_in_the_past

  private

  def target_date_cannot_be_in_the_past
    errors.add(:target_date, "can't be in the past") if target_date.present? && target_date < Date.today
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Goal, type: :model do
  subject { build(:goal) }

  describe 'validations' do
    it 'has a valid factory' do
      expect(subject).to be_valid
    end

    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:target_value) }
    it { should validate_numericality_of(:target_value).is_greater_than(0) }
    it { should validate_presence_of(:target_date) }
    it { should validate_presence_of(:tracking_interval) }

    it 'is not valid without a description' do
      subject.description = nil
      expect(subject).to_not be_valid
      expect(subject.errors).to have_key(:description)
    end

    it 'is not valid with a target value less than or equal to 0' do
      subject.target_value = -1
      expect(subject).to_not be_valid
      expect(subject.errors).to have_key(:target_value)
    end

    it 'is not valid with a target value greater than maximum integer' do
      subject.target_value = 2_147_483_648
      expect(subject).to_not be_valid
      expect(subject.errors).to have_key(:target_value)
    end

    it 'is not valid without a target date' do
      subject.target_date = nil
      expect(subject).to_not be_valid
      expect(subject.errors).to have_key(:target_date)
    end

    it 'is not valid with a past target date' do
      subject.target_date = Date.yesterday
      expect(subject).to_not be_valid
      expect(subject.errors[:target_date]).to include("can't be in the past")
    end

    it 'is valid with a current or future target date' do
      subject.target_date = Date.today
      expect(subject).to be_valid

      subject.target_date = Date.tomorrow
      expect(subject).to be_valid
    end

    it { should define_enum_for(:tracking_interval).with_values(daily: 0, hourly: 1, weekly: 2, monthly: 3) }

    it 'is not valid without a tracking interval' do
      subject.tracking_interval = nil
      expect(subject).to_not be_valid
      expect(subject.errors).to have_key(:tracking_interval)
    end
  end
end

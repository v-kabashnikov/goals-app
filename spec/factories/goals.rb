FactoryBot.define do
  factory :goal do
    description { 'Read 20 books' }
    target_value { 1000 }
    target_date { Date.today + 1.year }
    tracking_interval { 'monthly' }
  end
end

# frozen_string_literal: true

class StatSerializer < ActiveModel::Serializer
  attributes :id, :value, :created_at
end
